class Render {
  constructor(accountManager, nftInformation) {
    this.am = accountManager;
    this.ni = nftInformation;
  }

  async accountManager() {
    await this.am.render();
  }

  async nftInformation(tokenId) {
    await this.ni.render(tokenId);
  }
}

class AccountManager {
  constructor () {}

  async render() {
    const {ethBalance , nftBalance} = await pkToAccount(pk);

    const ethBalanceDom = document.getElementById('eth-balance');
    ethBalanceDom.innerText = `${ethBalance} ETH`
    const nftBalanceDom = document.getElementById('nft-token-count');
    nftBalanceDom.innerText = `${nftBalance} 개`
  }
}

class NftInformation {
  constructor () {}

  async render(tokenId) {
    const { author,  datetime, url} = await findNft(tokenId)

    const authorDom = document.getElementById('nft-desc-author');
    const datetimeDom = document.getElementById('nft-desc-datetime');
    const imgSourceDom = document.getElementById('nft-desc-img');
  
    authorDom.innerText = `${author}`;
    datetimeDom.innerText = `${datetime}`;
    imgSourceDom.src = url;
  }
}

