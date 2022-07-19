# Reach Language maps-sets-challenge

Level 2 - Submission

* This was made as a submission for level 2 challenge which requirement are highlighted here [**Copy of Maps and Sets Challenge (Public)**](https://docs.google.com/document/d/1LxZ_GaCh1JzPseuDFuGUc0DFk92xb8T0Dhr-1vN7-5k/edithttps:/)

## How to run it

1. Make sure you know how to run a Reach Program by following the Reach Docs found here: [Reach Docs](https://docs.reach.shhttps:/)
2. Clone this repository into your favorite location
3. Open 3 terminals
4. On first terminal run`reach run index creator`
5. On second terminal run`reach run index attacher`
6. On third terminal run`reach run index attacher`
7. The address for the second terminal participant, should be
   whitelisted when asked for an address for whitelist at first terminal.
8. After the address has been entered at first terminal, now continue with execution in second terminal and third terminal
9. The output should look similar to the following:
   1. First Terminal (Creator Terminal)

      ```

      Your role is creator
      The consensus network is ETH.
      Starting balances:
      0xA11176E5536217A5a6BB7B884451f1DB57aD7257 has 9.99 ETH and 10 shilingi
      Contract deployed with info: "0xb1B3cE621f549510e68A42854CacB278085CC4E9"
      Paste Recepient Address to Whitelist:
      0xa3BdC55519c6a12D166781d4131B40f8AeBB7980
      0xa3BdC55519c6a12D166781d4131B40f8AeBB7980 just attached to the contract.
      Waiting for a timeout.
      0xA11176E5536217A5a6BB7B884451f1DB57aD7257 has 9.99 ETH and 10 shilingi
      ```
   2. Second Terminal (Attacher One - Whitelisted)

      ```
      Your role is attacher
      The consensus network is ETH.
      Your address is: 0xa3BdC55519c6a12D166781d4131B40f8AeBB7980
      Paste contract info:
      "0xb1B3cE621f549510e68A42854CacB278085CC4E9"
      Tell creator to add your address to the contract whitelist, then press enter after it is added:

      I have received the key: 777
      0xa3BdC55519c6a12D166781d4131B40f8AeBB7980 has 9.99 ETH and 1 shilingi
      Waiting for a timeout.
      0xa3BdC55519c6a12D166781d4131B40f8AeBB7980 has 9.99 ETH and 1 shilingi
      ```
   3. Third Termianal (Attacher two - Not Whitelisted)

      ```
      Your role is attacher
      The consensus network is ETH.
      Your address is: 0x90C59df7574B56Af290d0d38df36365A6FBC023C
      Paste contract info:
      "0xb1B3cE621f549510e68A42854CacB278085CC4E9"
      Tell creator to add your address to the contract whitelist, then press enter after it is added:

      Well, You are not whitelisted.
      0x90C59df7574B56Af290d0d38df36365A6FBC023C has 10 ETH and 0 shilingi
      Waiting for a timeout.
      0x90C59df7574B56Af290d0d38df36365A6FBC023C has 10 ETH and 0 shilingi
      Well, something went wrong.
      ```
