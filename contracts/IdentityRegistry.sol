// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdentityRegistry {
    address public issuerAdmin;

    struct Credential {
        bytes32 docHash;     // SHA-256 hash of the ID document
        bool isValid;        // Status: True = Active, False = Revoked
        uint256 timestamp;   // Block timestamp
    }

    // Mapping from User Wallet Address -> Credential
    mapping(address => Credential) public credentials;

    event CredentialIssued(address indexed user, bytes32 docHash);
    event CredentialRevoked(address indexed user);

    modifier onlyAdmin() {
        require(msg.sender == issuerAdmin, "Only Authorized Issuer can call this");
        _;
    }

    constructor() {
        issuerAdmin = msg.sender;
    }

    // 1. Issuer registers a user's hashed document on-chain
    function issueCredential(address _user, bytes32 _docHash) public onlyAdmin {
        credentials[_user] = Credential(_docHash, true, block.timestamp);
        emit CredentialIssued(_user, _docHash);
    }

    // 2. Issuer revokes a credential
    function revokeCredential(address _user) public onlyAdmin {
        credentials[_user].isValid = false;
        emit CredentialRevoked(_user);
    }

    // 3. Verifier checks if document hash matches what is on-chain
    function verifyCredential(address _user, bytes32 _docHash) public view returns (bool) {
        Credential memory cred = credentials[_user];
        return (cred.isValid && cred.docHash == _docHash);
    }
}