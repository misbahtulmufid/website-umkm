const promoButton = document.querySelector("#promoButton");

promoButton.addEventListener("click", () => {
  promoButton.textContent = "Promo: Beli 2 gratis biji kopi!";
  console.log("Promo Kopi Tani Laras berhasil ditampilkan.");
});