const importBtn = document.getElementById('import')
const mintBtn = document.getElementById('nft-mint')
const searchBtn = document.getElementById('search');

const render = new Render(
  new AccountManager(),
  new NftInformation(),
);

importBtn.addEventListener('click', async () => {
  pk = document.getElementById('pk').value;
  if(!pk) {
    alert('개인키가 입력되어있지 않습니다.')
    return;
  }

  await render.accountManager();
});

mintBtn.addEventListener('click', async () => {
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
  const tokenId = document.getElementById('tokenId').value;
  const checkExp = /^[0-9]+$/; 
  
  if(!tokenId || !checkExp.test(tokenId)) {
    alert('숫자타입만 입력받을 수 있습니다.')
    return;
  }

  await render.nftInformation(tokenId);
})

