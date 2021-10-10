const masterchefContracts = {
    mooncake: "0xd6f0548dA9EF6A8aBEc6AdA35E10c0ECE0E2359A",
    moonlake: "0xBEA2B7641F3212913B34E461bFdFCf6FB8f5977a",
    foxy: "0x029bCC56f5129867705Efc58523E7C357644E807",
    apollo: "0xced23faa61f45c33a9d74b51e9da776b88fb4af8",
    give: "0x2882e8bB3B960f7A3b0168b933C956c67238d4eA"
}

const tokens = {
    mooncake: "0x66A66928186120465EAfB5B01317315679B72756",
    moonlake: "0x3288129be9679c559c2a3f4559eccc8835cb08a0",
    foxy: "0x45a9868610F65ab04a1948394B373E063B588927",
    apollo: "0x668bF723bBB4cBBDbFD91337Ce57D510fFD28f82",
    usdc: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
    wmovr: "0x98878B06940aE243284CA214f92Bb71a2b032B8A",
    mswap: "0xB3FB48bF090bEDFF4f6F93FFb40221742E107db7",
    give:"0x1078a9280BDcF616D9eFb687D5A44Af4264fb923"
}

const suspiciousWallets = [
    "add-wallet-here"
]

const hashes = {
    deposit: "0xe2bbb158",
    swapExactTokensForTokens: "0x38ed1739",
    swapExactTokensForETH: "0x18cbafe5",
    transfers: "0xa9059cbb",
}

const chain = {
    chainUrl: "https://rpc.moonriver.moonbeam.network"
}

module.exports = {
    masterchefContracts,
    suspiciousWallets,
    chain, 
    hashes,
    tokens
}