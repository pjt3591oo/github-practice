const importBtn = document.getElementById('import')
const mintBtn = document.getElementById('nft-mint')
const searchBtn = document.getElementById('search');

const connectBtn = document.getElementById('node-connect');

const render = new Render(
  new AccountManager(),
  new NftInformation(),
  new Indicator(),
);

connectBtn.addEventListener('click', async () => {
  const ca = document.getElementById('ca').value;
  const ethHost = document.getElementById('eth-host').value;
  const ethPort = document.getElementById('eth-port').value;
  const ipfsHost = document.getElementById('ipfs-host').value;
  const ipfsPort = document.getElementById('ipfs-port').value;

  if (!ca || !ethHost || !ethPort || !ipfsHost || !ipfsPort  ) {
    alert('연결에 필요한 정보가 부족합니다.');
    return;
  }

  const checkExp = /^[0-9]+$/; 
  if(!checkExp.test(ethPort) || !checkExp.test(ipfsPort) ) {
    alert('포트는 숫자 타입만 입력가능합니다.');
    return;
  }

  setNode(ethHost, ethPort, ipfsHost, ipfsPort);
  setContract(ca);
  render.onNodeByIndicator();
})

importBtn.addEventListener('click', async () => {
  if(!web3 || !contract) {
    alert('노드와 연결되지 않았습니다.')
    return;
  }
  pk = document.getElementById('pk').value;
  if(!pk) {
    alert('개인키가 입력되어있지 않습니다.')
    return;
  }

  await render.accountManager();
});

mintBtn.addEventListener('click', async () => {
  if(!web3 || !contract) {
    alert('노드와 연결되지 않았습니다.')
    return;
  }
  const author = document.getElementById('author').value;
  const files = document.getElementById('file-upload').files;
  if ( !author || files.length < 1) {
    alert('폼이 비었습니다.')
    return
  }
  // web3.js 호출 => 이더리움
  const isSuccess = await mint(author, files[0]);

  if (isSuccess) {
    await render.accountManager();
  } else {
    alert('발행실패')
  }
});

searchBtn.addEventListener('click', async () => {
  console.log(web3)
  console.log(contract)
  if(!web3 || !contract) {
    alert('노드와 연결되지 않았습니다.')
    return;
  }
  const tokenId = document.getElementById('tokenId').value;
  const checkExp = /^[0-9]+$/; 
  
  if(!tokenId || !checkExp.test(tokenId)) {
    alert('숫자타입만 입력받을 수 있습니다.')
    return;
  }

  await render.nftInformation(tokenId);
})

