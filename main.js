const eth = new Eth(State);
const erc20 = new Erc20(State);
const wallet = new Wallet(eth, State);

wallet.setCheckpoint(eth)

const typeChangeRadio = document.querySelectorAll(".radio input[name='type']");

typeChangeRadio[0].addEventListener('change', function () {
  wallet.setCheckpoint(eth)
});

typeChangeRadio[1].addEventListener('change', function () {
  wallet.setCheckpoint(erc20)
});
