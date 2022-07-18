'reach 0.1';


export const main = Reach.App(() => {
    // setOptions({ untrustworthyMaps: true})
  
    const A = Participant('Creator', {
        deployed: Fun(true, Null),                                                                                                                
        deadline: UInt,
        ...hasConsoleLogger, 
        //              Supply,  Return
        addToWhitelist: Fun([], Address),
        notify: Fun([Address], Null)
    });

    const B = API('Attacher', {
        requestTimeout: Fun([], Bool),        
        receiveKey: Fun([Address], UInt)
    });

    init();
    
    A.only(() => {
        const deadline = declassify(interact.deadline);
    });
       
    A.publish(deadline);

    const whitelist = new Set();

    commit();

    A.interact.deployed();

    const deadlineBlock = relativeTime(deadline);    

    A.only(() => {
        const addTo = declassify(interact.addToWhitelist());
    });
    A.publish(addTo);

    whitelist.insert(addTo);

    const [ keepGoing ] = 
        parallelReduce([true])
        .invariant(balance() == 0)
        .while(keepGoing) 
        .api_(B.receiveKey, (who) => {
            // check(this == A, "I am the admin");
            check(whitelist.member(who), 'Not authorized')
            return [0, (z) => {
                z(777);
                A.interact.notify(this);
                whitelist.remove(who);                
                return [ keepGoing ]
            }];
        })
        .timeout(deadlineBlock, () => {
            const [[], k ] = call(B.requestTimeout);
            k(true);
            return [ false ]
        });

    transfer(balance()).to(A);
    commit();
    exit();
});