pragma solidity ^0.4.22;

contract Fundcast {

    event unlockedPodcast(
        address host
    );

    function unlockPodcast(address host) public payable {
        host.transfer(msg.value);
        emit unlockedPodcast(host);
    }

}
