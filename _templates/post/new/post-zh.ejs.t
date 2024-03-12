---
to: "content/posts/<%= type === 'post' ? `${date}-${slug}` : `project-${slug}` %>.mdx"
---

---
title: ''
description: ''
slug: '<%= slug %>'
language: zh-TW
socialImage: ''
date: <%= date %>
type: Post
isDraft: false
---

<!-- ![](/images/<%= type === 'post' ? `${date}-${slug}` : `project-${slug}` %>/.jpg) -->
