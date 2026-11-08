"use strict";

console.log("P10 JavaScript aktif");

const produkUmkm = [
  {
    nama: "Kopi Tubruk Robusta Natural",
    kategori: "Kopi",
    harga: 20000,
    stok: 20,
    unggulan: true
  },
  {
    nama: "Kopi Tubruk Robusta Wine",
    kategori: "Kopi",
    harga: 22000,
    stok: 0,
    unggulan: true
  },
  {
    nama: "Kopi Arabika",
    kategori: "Kopi",
    harga: 50000,
    stok: 12,
    unggulan: false
  },
  {
    nama: "Paket Kopi Tani Laras (3 varian)",
    kategori: "Bundling",
    harga: 45000,
    stok: 8,
    unggulan: false
  }
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(nilai);
}

function statusStok(stok) {
  if (stok <= 0) {
    return {
      label: "Habis",
      className: "empty"
    };
  }

  if (stok <= 5) {
    return {
      label: "Stok terbatas",
      className: "warning"
    };
  }

  return {
    label: "Tersedia",
    className: ""
  };
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p>${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">
        ${status.label}
      </span>
      ${produk.unggulan ? "<strong>Produk Unggulan</strong>" : ""}
    </article>
  `;
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    return;
  }

  const produkTersedia = produkUmkm.filter(
    (produk) => produk.stok > 0
  );

  const produkUnggulan = produkUmkm.find(
    (produk) => produk.unggulan === true
  );

  const markupProduk = produkTersedia
    .map(buatKartuProduk)
    .join("");

  grid.innerHTML = markupProduk;

  ringkasan.textContent =
    `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;

  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);