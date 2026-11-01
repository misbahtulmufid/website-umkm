"use strict";

console.log("P09 JavaScript aktif");

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
    nama: "Paket Kopi Tani Laras(3 varian)",
    kategori: "Bundling",
    harga: 45000,
    stok: 8,
    unggulan: false
  }
];

console.table(produkUmkm);

function statusStok(stok) {
  if (stok === 0) {
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

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";

    case "Bundling":
      return "Paket hemat";

    default:
      return "Produk UMKM";
  }
}

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) return;

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);

    // Operator ternary untuk menentukan label aksi
    const labelAksi = produk.stok > 0
      ? "Siap dipesan"
      : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">
          ${status.label}
        </span>
        <p>${labelAksi}</p>
        ${produk.unggulan ? "<strong>Produk Unggulan</strong>" : ""}
      </article>
    `;
  }

  grid.innerHTML = markup;

ringkasan.textContent =
  "Temukan kopi favoritmu dari berbagai pilihan produk kami.";
}

document.addEventListener("DOMContentLoaded", renderProduk);