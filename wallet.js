// state pattern

const recoveryBtn = document.getElementById('recovery-btn');
const sendBtn = document.getElementById('send-btn');
const confirmBtn = document.getElementById('confirm-btn');

class Wallet {
  constructor(checkpoint, state) {
    this.checkpoint = checkpoint;
    this.state = state
  }

  setCheckpoint(checkpoint) {
    this.#removeEventListener();
    this.checkpoint = checkpoint;

    this.onRecovery = this.#onRecoveryListener.bind(this);
    this.onShowPopup = this.#onShowPopupListener.bind(this);
    this.onSendSubmit = this.#onSendSubmitListener.bind(this);
    this.#bindEventListener();
  }

  #onRecoveryListener() {
    this.state.setContract();
    this.state.setPrivateKey();

    this.checkpoint.onRecovery()
  }
  #onShowPopupListener() {
    this.checkpoint.onShowPopup()
  }
  #onSendSubmitListener() {
    this.checkpoint.onSendSubmit()
  }

  #removeEventListener() {
    this.#removeRecovery()
    this.#removeShowPopup()
    this.#removeSendSubmit()
  }

  #bindEventListener() {
    this.#onRecovery();
    this.#onShowPopup();
    this.#onSendSubmit();
  }

  #onRecovery() {
    recoveryBtn.addEventListener('click',  this.onRecovery);
  }

  #onShowPopup() {
    sendBtn.addEventListener('click',  this.onShowPopup);
  }

  #onSendSubmit() {
    confirmBtn.addEventListener('click',  this.onSendSubmit);
  }

  #removeRecovery() {
    recoveryBtn.removeEventListener('click', this.onRecovery );
  }

  #removeShowPopup() {
    sendBtn.removeEventListener('click', this.onShowPopup );
  }

  #removeSendSubmit() {
    confirmBtn.removeEventListener('click', this.onSendSubmit );
  }
}



