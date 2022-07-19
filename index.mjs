import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import { ask } from '@reach-sh/stdlib';

if (process.argv.length < 3 || ['creator', 'attacher'].includes(process.argv[2]) == false) {
    console.log('Usage: reach run index [creator|attacher]');
    process.exit(0);
}
const role = process.argv[2];
console.log(`Your role is ${role}`);

const stdlib = loadStdlib(process.env);
console.log(`The consensus network is ${stdlib.connector}.`);

const deadline = { ETH: 250, ALGO: 100, CFX: 1000 }[stdlib.connector];

const accCreator = await stdlib.newTestAccount(stdlib.parseCurrency(10));
const accAttacher = await stdlib.newTestAccount(stdlib.parseCurrency(10));

const fmt = (amt) => stdlib.formatCurrency(amt, 2);
const nft = await stdlib.launchToken(accCreator, "shilingi", "TSH", { supply: 10 });
await accAttacher.tokenAccept(nft.id);

const conn = stdlib.connector;
if (conn == 'ETH') {
    const myGasLimit = 5000000;
    accCreator.setGasLimit(myGasLimit);
    accAttacher.setGasLimit(myGasLimit);
    
} else if (conn == 'ALGO') {
    await stdlib.transfer(accCreator, accCreator, 0, nft.id);
    await stdlib.transfer(accAttacher, accAttacher, 0, nft.id);
}

const showBalances = async (acc) => {
    const [netAmnt, nftAmnt] = await stdlib.balancesOf(acc, [null, nft.id]);
    console.log(`${acc.getAddress()} has ${fmt(netAmnt)} ${stdlib.standardUnit} and ${nftAmnt} ${nft.name}`);
}

if (role === 'creator') {
    const creatorInteract = {
        deadline: deadline,
        deployed: async () => {
            console.log(`Contract deployed with info: ${JSON.stringify(await ctc.getInfo())}`);
        },
        addToWhitelist: async () => {
            const rAddr = await ask.ask('Paste Recepient Address to Whitelist: ');
            return rAddr
        },
        notify: async (who) => {
            
            console.log(`${who} just attached to the contract.`);
        },
        maxParticipants: 5,
        rewardAmount: 1,
        stakeAmount: 1,
        nft: nft.id,
        ...stdlib.hasConsoleLogger,
    };

    const ctc = accCreator.contract(backend);

    console.log("Starting balances:");

    await showBalances(accCreator);

    await ctc.participants.Creator(creatorInteract);
    
    console.log('Waiting for a timeout.');
    await stdlib.wait(deadline);

    await showBalances(accCreator);

} else {    
    console.log(`Your address is: ${accAttacher.getAddress()}`);

    const info = await ask.ask('Paste contract info:', (s) => JSON.parse(s));
    const ctc = accAttacher.contract(backend, info);
    await ask.ask('Tell creator to add your address to the contract whitelist, then press enter after it is added:')
    try {
        const rck = await ctc.apis.Attacher.receiveKey(accAttacher);
        await stdlib.transfer(accCreator,accAttacher, 1, nft.id);
        console.log(`I have received the key: ${rck}`);
    } catch (e) {
        console.log(`Well, You are not whitelisted.`);
       // console.log(`${e}`)
    }

    await showBalances(accAttacher);

    console.log('Waiting for a timeout.');
    await stdlib.wait(deadline);
    await showBalances(accAttacher);

    try {
        await ctc.apis.Attacher.requestTimeout();
    } catch (e) {
        console.log(`Well, something went wrong.`)
    }    
}

ask.done();