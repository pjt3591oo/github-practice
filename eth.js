class Eth {
  constructor (state) {
    this.state = state
  }

  async onRecovery() {
    const balance = await this.state.web3.eth.getBalance(this.state.account.address);
    document.getElementById('balance').value = this.state.web3.utils.fromWei(balance, 'ether');
  }

  onShowPopup() {
    if(!this.state.account) {
      alert('지갑 복구가 되어있지 않습니다.')
      return;
    }
    const popup = document.getElementById('popup')
    const c = popup.getAttribute('class');
    const defaultClass = ['popup'];
    
    (!c.includes('show')) && defaultClass.push('show');

    popup.setAttribute('class', defaultClass.join(' '))

    document.getElementById('value').setAttribute('placeholder', 'value(ETH)')
  }

  async onSendSubmit() {
    const to = document.getElementById('to').value;
    const value = document.getElementById('value').value;

    const tx = {
      from: this.state.account.address,
      to: to,
      value: this.state.web3.utils.toWei(value, 'ether'),
      gas: 1000000,
      gasPrice: '21000000000',
    }

    const signedTx = await this.state.account.signTransaction(tx)
    const sentTx = await this.state.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    const balance = await this.state.web3.eth.getBalance(this.state.account.address);
    document.getElementById('balance').value = this.state.web3.utils.fromWei(balance, 'ether');
    alert(`전송이 정상적으로 완료되었습니다: ${sentTx.transactionHash}`)
  }
}
