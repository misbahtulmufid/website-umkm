"use strict";

console.log("P11 JavaScript aktif");

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

function renderProduk10() {
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

const produkGrid = document.querySelector("#produk-dinamis");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

console.log("Target grid:", produkGrid);
console.log("Target status:", produkStatus);
console.log("Jumlah tombol filter:", tombolFilter.length);

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("js-product-card", "product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);

  stock.classList.add("stock-badge");

  if (status.className) {
    stock.classList.add(status.className);
  }

  stock.textContent = status.label;

  card.append(title, category, price, stock);

  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");

  empty.classList.add("empty-state");

  empty.textContent =
    `Belum ada produk pada kategori ${kategori}.`;

  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

renderProduk();

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
    });

    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});