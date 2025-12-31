+++
title = "RustAPI"
date = 2023-01-01
draft = false
description = "Rust ekosistemi için FastAPI benzeri, ergonomik ve yüksek performanslı web framework'ü."
[taxonomies]
tags = ["rust", "web-framework", "api", "openapi"]
[extra]
category = "Open Source"
+++

RustAPI, modern web framework'lerinin (FastAPI gibi) geliştirici deneyimini (DX) Rust ekosistemine getirmeyi amaçlayan, ergonomik ve üretim odaklı bir web çatısıdır.

## Vizyon 🚀

Yüksek performanslı ve tip güvenli web API'leri yazmanın, karmaşık trait sınırlarıyla veya devasa kod tekrarlarıyla (boilerplate) boğuşmayı gerektirmediğine inanıyoruz. RustAPI, şunları sunan cilalanmış bir deneyim sağlar:

- **API Tasarımı Birinci Sınıftır:** Şemanızı tanımlayın, doğrulama ve OpenAPI dokümantasyonunu framework halletsin.
- **Motor Soyutlanmıştır:** Dahili olarak `tokio`, `hyper` ve `matchit` gibi endüstri standartlarına dayanır, ancak kararlı ve kullanıcı odaklı bir API sunar.
- **Sıfır Boilerplate:** Extractor'lar ve makrolar ağır işi yapar.

## Özellikler ✨

- **⚡ Hızlı ve Asenkron:** `tokio` ve `hyper` 1.0 üzerine inşa edilmiştir.
- **🛡️ Tip Güvenli:** İstek/Yanıt gövdeleri jenerik extractor'lar (`Json`, `Query`, `Path`) kullanılarak sıkı bir şekilde tiplendirilir.
- **📝 Otomatik OpenAPI:** Kodunuz dokümantasyonunuzdur. Swagger UI `/docs` adresinde kutudan çıktığı gibi sunulur.
- **✅ Dahili Doğrulama:** Yapılarınıza `#[validate(email)]` ekleyin ve otomatik 422 hata yönetimi elde edin.
- **🧩 Sezgisel Yönlendirme:** `#[rustapi::get]`, `#[rustapi::post]` gibi basit makrolarla Radix-tree tabanlı yönlendirme.
- **🔋 Piller Dahil:** Middleware, JWT kimlik doğrulama, CORS, hız sınırlama (rate limiting) ve yapılandırma yönetimi.

## Hızlı Başlangıç 📦

`Cargo.toml` dosyanıza `rustapi-rs` ekleyin:

```toml
[dependencies]
rustapi-rs = "0.1"
```

Basit bir "Merhaba Dünya" örneği:

```rust
use rustapi_rs::prelude::*;

/// Yanıt şemanızı tanımlayın
#[derive(Serialize, Schema)]
struct HelloResponse {
    message: String,
}

/// Bir uç nokta (endpoint) tanımlayın
#[rustapi::get("/")]
#[rustapi::tag("Genel")]
#[rustapi::summary("Merhaba Dünya Uç Noktası")]
async fn hello() -> Json<HelloResponse> {
    Json(HelloResponse {
        message: "RustAPI'den Merhaba!".to_string(),
    })
}

/// Sunucuyu çalıştırın
#[rustapi::main]
async fn main() -> Result<()> {
    RustApi::new()
        .mount_route(hello_route()) // Otomatik oluşturulan rota işleyicisi
        .docs("/docs")              // Swagger UI'ı etkinleştir
        .run("127.0.0.1:8080")
        .await
}
```

## Mimari 🏗️

RustAPI, uzun vadeli kararlılık sağlamak için Facade Mimarisi izler:

- **`rustapi-rs`**: Halka açık crate. Temiz bir yüzey sağlamak için özenle seçilmiş türleri ve trait'leri yeniden dışa aktarır.
- **`rustapi-core`**: Dahili motor. HTTP protokolünü, yönlendirme mantığını ve bağlayıcı kodları yönetir.
- **`rustapi-macros`**: `#[rustapi::main]` ve `#[rustapi::get]` gibi ergonomik nitelikleri güçlendirir.
- **`rustapi-openapi` / `rustapi-validate`**: Harici ekosistemleri (`utoipa`, `validator`) tutarlı API'mize saran özelleştirilmiş crate'ler.

Daha fazla bilgi ve kaynak kodları için [GitHub Deposu](https://github.com/Tuntii/RustAPI)nu ziyaret edebilirsiniz.
