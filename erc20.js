class Erc20 {
  constructor (state) {
    this.state = state;
  }
  
  async onRecovery() {
    const balance = await this.state.contract.methods.balanceOf(this.state.account.address).call()
    const symbol = await this.state.contract.methods.name().call();
    document.getElementById('balance').value = `${balance} ${symbol}`;
  }

  onShowPopup() {
    if(!this.state.account || !this.state.contract) {
      alert('지갑 또는 컨트랙트 복구가 되어있지 않습니다.')
      return;
    }
    const popup = document.getElementById('popup')
    const c = popup.getAttribute('class');
    const defaultClass = ['popup'];
    
    (!c.includes('show')) && defaultClass.push('show');

    popup.setAttribute('class', defaultClass.join(' '))
    document.getElementById('value').setAttribute('placeholder', 'value(ERC)')
  }

  async onSendSubmit() {
    const to = document.getElementById('to').value;
    const value = document.getElementById('value').value;

    const txhash = await this.state.contract.methods.transfer(to, parseInt(value)).send({
      from: this.state.account.address,
      gas: 3000000,
      gasPrice: '20000000000',
      gasLimit: '3000000',
      privateKey: this.state.pk
    });

    await this.onRecovery();
    this.onShowPopup
    alert(`전송완료: ${txhash.transactionHash}`)
  }
}