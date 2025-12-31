+++
title = "Rust ile Güvenli Bellek Yönetimi"
date = 2024-12-28
description = "Rust programlama dilinin bellek güvenliğini nasıl sağladığına dair derinlemesine bir bakış."
[taxonomies]
tags = ["rust", "programming", "memory-safety"]
[extra]
category = "Technical"
+++

Rust, bellek güvenliğini garanti eden sahiplik (ownership) modeli ile tanınır. Bu yazıda, borrow checker'ın nasıl çalıştığını ve yaygın bellek hatalarını nasıl önlediğini inceleyeceğiz.

## Sahiplik Kuralları

1. Rust'taki her değerin bir sahibi (owner) vardır.
2. Aynı anda sadece bir sahibi olabilir.
3. Sahibi kapsam dışına çıktığında, değer düşürülür (dropped).
