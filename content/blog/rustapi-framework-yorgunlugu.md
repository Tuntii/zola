+++
title = "Framework Yorgunluğu ve RustAPI'nin Doğuşu: Geliştirici Deneyimini (DX) Geri Kazanmak"
date = 2026-01-20
description = "RustAPI'nin framework yorgunluğuna bir çözüm olarak nasıl doğduğunu ve geliştirici deneyimini nasıl iyileştirdiğini anlatıyor."
[taxonomies]
tags = ["rust", "api", "framework", "dx", "rustapi"]
[extra]
category = "Rust"
+++

Yazılım dünyasında sıkça duyduğumuz bir terim var: **Framework Yorgunluğu**. Sürekli yeni bir araç öğrenmek zorunda kalmak bir yana, mevcut araçların karmaşıklığı, versiyon güncellemeleriyle kırılan kodlar ve "basit" bir API ayağa kaldırmak için harcanan saatler geliştiricileri tükenme noktasına getirebiliyor. Özellikle Rust ekosisteminde, performans muazzam olsa da, parçaları birleştirmek (routing, dokümantasyon, doğrulama vb.) bazen bir yapbozu tamamlamaya benziyor.

İşte **RustAPI**, tam olarak bu karmaşaya ve yorgunluğa bir tepki olarak doğdu. Peki, RustAPI'yi diğerlerinden ayıran felsefe ne?

### 1. İstikrar Arayışı: Facade Mimarisi

Geliştiricileri en çok yoran durumlardan biri, altyapıdaki kütüphanelerin (örneğin `hyper` veya `tokio`) güncellenmesiyle uygulamanın çalışmaz hale gelmesidir. RustAPI'nin doğuşundaki temel vizyon şudur: **"API yüzeyi bizimdir, motorlar değişebilir."**.

RustAPI, "Facade Architecture" (Ön Yüz Mimarisi) kullanır. Bu sayede siz `rustapi-rs` ile kod yazarsınız ve arkada kullanılan motorlar (`hyper`, `tokio`, `validator`) değişse veya güncellense bile sizin kodunuz kırılmaz. Örneğin `hyper 2.0` çıktığında framework kendi çekirdeğini günceller ama sizin `RustApi::new()` kodunuz çalışmaya devam eder. Bu, geliştiricideki "bakım yükü" stresini ortadan kaldırır.

### 2. "Piller Dahil" (Batteries Included) Felsefesi

Modern bir API yazmak için sadece bir router yetmez. JWT, CORS, Rate Limiting, OpenAPI dokümantasyonu gibi parçalara ihtiyacınız vardır. Diğer frameworklerde (örneğin Axum veya Actix-web) bu parçaları tek tek bulup entegre etmeniz ve uyumlu çalıştırmanız gerekirken, RustAPI bu yorgunluğu bitirmeyi hedefler.

RustAPI; JWT, CORS, Rate Limiting ve en önemlisi **otomatik OpenAPI (Swagger)** desteğini yerleşik olarak sunar. Sadece 5 satır kod ile çalışan, dokümantasyonu hazır bir REST endpoint'i oluşturabilirsiniz. Bu, Python dünyasındaki **FastAPI** ergonomisinin Rust performansıyla buluşmasıdır.

### 3. Yapay Zeka ve LLM Çağına Hazırlık

RustAPI'nin doğuşunun bir diğer önemli sebebi de, API geliştirme süreçlerinin artık Yapay Zeka (AI) çağına evrilmesidir. Geleneksel JSON formatı, LLM (Büyük Dil Modelleri) ile iletişimde token maliyetlerini artırabilir.

RustAPI, bu soruna çözüm olarak **TOON (Token-Oriented Object Notation)** formatını sunar. Bu format, JSON'a kıyasla **%50-58 oranında token tasarrufu** sağlar. MCP (Model Context Protocol) sunucuları ve AI ajanları için optimize edilmiş olması, onu sadece bugünün değil, geleceğin ihtiyaçları için tasarlanmış bir framework yapar.

### 4. Performanstan Ödün Vermeden Ergonomi

Genellikle kullanım kolaylığı (ergonomi) arttıkça performans düşer. Python'un FastAPI'si çok kolaydır ancak yavaştır. RustAPI ise bu denklemi bozar. `simd-json` ve `tokio` üzerine kurulu yapısıyla saniyede ~185.000 - 220.000 istek karşılayabilir. Bu, geliştiricinin "kolay yazayım ama yavaş olsun" ya da "hızlı olsun ama yazması zor olsun" ikilemi arasında kalmasını engeller.

### Sonuç: Neden RustAPI?

RustAPI, geliştiricilerin boğuştuğu "trait bound" hatalarına, manuel dokümantasyon yazma zorunluluğuna ve versiyon uyumsuzluklarına bir son vermek için doğmuştur. Eğer siz de frameworklerin konfigürasyonlarıyla uğraşmaktan yorulduysanız ve sadece iş mantığınıza odaklanmak istiyorsanız, RustAPI'nin sunduğu modern geliştirici deneyimine (DX) bir şans vermelisiniz.

***
*Kaynaklar:*
*[Tuntii/RustAPI GitHub Repository](https://github.com/Tuntii/zola)*
