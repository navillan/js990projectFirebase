For English, read this section. Türkçe için aşağıya bakın.

# Js990Project1 (Restaurant Reservation)

A single-page React application for restaurant reservations with an admin panel. Data is stored in Firebase (Firestore), and admin login uses Firebase Authentication.

Deployed as a GitHub Pages project site: https://navillan.github.io/js990projectFirestore

## Features
- Step-by-step reservation flow (date, time, guest count, contact info)
- Client-side validation for inputs
- Bilingual UI: Turkish and English toggle
- Admin login via Firebase Auth (email/password)
- Admin panel to view/update/delete reservations
- Persistent data in Firebase Firestore

## Project Structure
```
Js990Project1/
  public/
    index.html
  src/
    components/
      app.js            # Main UI and simple route switching
      adminPage.js      # Admin login (Firebase Auth) and entry to panel
      adminPaneli.js    # Admin operations
      steps.js          # Reservation steps (TR)
      stepsEng.js       # Reservation steps (EN)
      mainSelectors*.js # Form selectors (TR/EN)
    hooks/              # Custom hooks (if any)
    index.js            # App entry; initializes Firebase and Firestore
  package.json          # CRA scripts and gh-pages deploy
```

## Tech stack
- React (Create React App)
- Firebase (Auth + Firestore)
- GitHub Pages for hosting

## Run locally

```bash
npm install
npm start
```

The app runs at http://localhost:3000/js990projectFirestore.
The admin page runs at http://localhost:3000/admin.
admin username = admin
admin password = 1234

## Deploy (GitHub Pages)

```bash

The site will be available under the project path above. To access the admin view in production, navigate to:
 
- GitHub Pages: https://navillan.github.io/js990projectFirestore.
- Admin Page: https://navillan.github.io/js990projectFirestore/admin.
admin username = admin
admin password = 1234

```

## Author
Mert Selamlar

---

## Türkçe

# Js990Project1 (Restoran Rezervasyonu)

React ile geliştirilmiş, admin paneli olan tek sayfalık bir rezervasyon uygulaması. Veriler Firebase Firestore’da tutulur, admin girişi Firebase Authentication (email/şifre) ile yapılır.

GitHub Pages proje sitesi olarak yayınlanır: https://navillan.github.io/js990projectFirebase

## Özellikler
- Adım adım rezervasyon akışı (tarih, saat, kişi sayısı, iletişim)
- Form alanları için istemci tarafı doğrulama
- Dil seçimi: Türkçe/İngilizce
- Admin girişi (Firebase Auth, email/şifre)
- Admin paneli üzerinden rezervasyonları görüntüleme/düzenleme/silme
- Kalıcı veri saklama (Firebase Firestore)

## Proje Yapısı
```
Js990Project1/
  public/
  src/
    components/ (app.js, adminPage.js, adminPaneli.js, steps*.js, mainSelectors*.js)
    hooks/
    index.js (Firebase başlatma ve Firestore)
  package.json
```

## Yerelde Çalıştırma
```bash
npm install
npm start
```
Uygulama http://localhost:3000/js990projectFirestore adresinde çalışır.
Admin sayfası http://localhost:3000/admin adresinde çalışır.
admin kullanıcı adı = admin
admin parola = 1234

## Yayınlanmış Hali (GitHub Pages)
```bash

Yayın URL’si: https://navillan.github.io/js990projectFirestore

- Yayın Admin Sayfası: https://navillan.github.io/js990projectFirestore/admin
admin username = admin
admin password = 1234
```
