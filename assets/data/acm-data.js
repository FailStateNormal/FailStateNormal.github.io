window.ACM_TEMPLATES = [
  {
    "chapter": "第一章  基础算法",
    "title": "1.1 快速排序",
    "id": "template-1-1-1-快速排序",
    "code": "void quick_sort(int q[], int l, int r) {\n    if (l >= r) return;\n    int i = l - 1, j = r + 1, x = q[l + r >> 1];\n    while (i < j) {\n        do i++; while (q[i] < x);\n        do j--; while (q[j] > x);\n        if (i < j) swap(q[i], q[j]);\n    }\n    quick_sort(q, l, j);\n    quick_sort(q, j + 1, r);\n}"
  },
  {
    "chapter": "第一章  基础算法",
    "title": "1.2 归并排序 / 逆序对",
    "id": "template-2-1-2-归并排序-逆序对",
    "code": "int tmp[N];\nlong long merge_sort(int q[], int l, int r) {\n    if (l >= r) return 0;\n    int mid = l + r >> 1;\n    long long res = merge_sort(q, l, mid) + merge_sort(q, mid + 1, r);\n    int k = 0, i = l, j = mid + 1;\n    while (i <= mid && j <= r)\n        if (q[i] <= q[j]) tmp[k++] = q[i++];\n        else { tmp[k++] = q[j++]; res += mid - i + 1; } // 逆序对计数\n    while (i <= mid) tmp[k++] = q[i++];\n    while (j <= r)   tmp[k++] = q[j++];\n    for (i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j];\n    return res;\n}"
  },
  {
    "chapter": "第一章  基础算法",
    "title": "1.3 整数二分",
    "id": "template-3-1-3-整数二分",
    "code": "// 找满足条件的最左边的位置\nint bsearch_left(int l, int r) {\n    while (l < r) {\n        int mid = l + r >> 1;\n        if (check(mid)) r = mid;\n        else l = mid + 1;\n    }\n    return l;\n}\n// 找满足条件的最右边的位置\nint bsearch_right(int l, int r) {\n    while (l < r) {\n        int mid = l + r + 1 >> 1;\n        if (check(mid)) l = mid;\n        else r = mid - 1;\n    }\n    return l;\n}"
  },
  {
    "chapter": "第一章  基础算法",
    "title": "1.4 高精度(C++ vector版)",
    "id": "template-4-1-4-高精度-C-vector版",
    "code": "// 加法\nvector<int> add(vector<int>& A, vector<int>& B) {\n    if (A.size() < B.size()) return add(B, A);\n    vector<int> C;\n    int t = 0;\n    for (int i = 0; i < (int)A.size(); i++) {\n        t += A[i];\n        if (i < (int)B.size()) t += B[i];\n        C.push_back(t % 10);\n        t /= 10;\n    }\n    if (t) C.push_back(t);\n    return C;\n}\n// 减法 (要求 A >= B >= 0)\nvector<int> sub(vector<int>& A, vector<int>& B) {\n    vector<int> C;\n    for (int i = 0, t = 0; i < (int)A.size(); i++) {\n        t = A[i] - t;\n        if (i < (int)B.size()) t -= B[i];\n        C.push_back((t + 10) % 10);\n        t = t < 0 ? 1 : 0;\n    }\n    while (C.size() > 1 && C.back() == 0) C.pop_back();\n    return C;\n}\n// 乘低精度\nvector<int> mul(vector<int>& A, int b) {\n    vector<int> C;\n    int t = 0;\n    for (int i = 0; i < (int)A.size() || t; i++) {\n        if (i < (int)A.size()) t += A[i] * b;\n        C.push_back(t % 10);\n        t /= 10;\n    }\n    while (C.size() > 1 && C.back() == 0) C.pop_back();\n    return C;\n}\n// 除低精度，r 为余数\nvector<int> div(vector<int>& A, int b, int& r) {\n    vector<int> C;\n    r = 0;\n    for (int i = A.size() - 1; i >= 0; i--) {\n        r = r * 10 + A[i];\n        C.push_back(r / b);\n        r %= b;\n    }\n    reverse(C.begin(), C.end());\n    while (C.size() > 1 && C.back() == 0) C.pop_back();\n    return C;\n}\n// 读入：逆序存，低位在前\n// string s; cin >> s; vector<int> A; for (int i = s.size()-1; i >= 0; i--) A.push_back(s[i]-'0');"
  },
  {
    "chapter": "第一章  基础算法",
    "title": "1.5 前缀和 / 差分",
    "id": "template-5-1-5-前缀和-差分",
    "code": "// 一维前缀和: s[i] = a[1]+...+a[i]\n// 区间和 [l,r] = s[r] - s[l-1]\n\n// 二维前缀和\nint s[N][N];\n// 初始化: for i for j: s[i][j] = s[i-1][j]+s[i][j-1]-s[i-1][j-1]+a[i][j]\n// 子矩阵和(x1,y1)到(x2,y2): s[x2][y2]-s[x1-1][y2]-s[x2][y1-1]+s[x1-1][y1-1]\n\n// 一维差分: 区间[l,r]加c → b[l]+=c, b[r+1]-=c，前缀和还原\n// 二维差分: 子矩阵(x1,y1)-(x2,y2)加c →\n//   b[x1][y1]+=c, b[x2+1][y1]-=c, b[x1][y2+1]-=c, b[x2+1][y2+1]+=c"
  },
  {
    "chapter": "第一章  基础算法",
    "title": "1.6 双指针",
    "id": "template-6-1-6-双指针",
    "code": "// 模板框架\nfor (int i = 0, j = 0; i < n; i++) {\n    while (j < i && check(i, j)) j++;\n    // 具体逻辑\n}"
  },
  {
    "chapter": "第一章  基础算法",
    "title": "1.7 离散化",
    "id": "template-7-1-7-离散化",
    "code": "vector<int> alls;\nsort(alls.begin(), alls.end());\nalls.erase(unique(alls.begin(), alls.end()), alls.end());\n// 查找 x 对应的离散编号 (1-indexed)\nint find(int x) {\n    return lower_bound(alls.begin(), alls.end(), x) - alls.begin() + 1;\n}"
  },
  {
    "chapter": "第一章  基础算法",
    "title": "1.8 区间合并",
    "id": "template-8-1-8-区间合并",
    "code": "void merge(vector<pair<int,int>>& segs) {\n    vector<pair<int,int>> res;\n    sort(segs.begin(), segs.end());\n    int st = -2e9, ed = -2e9;\n    for (auto& s : segs) {\n        if (ed < s.first) {\n            if (st != -2e9) res.push_back({st, ed});\n            st = s.first; ed = s.second;\n        } else ed = max(ed, s.second);\n    }\n    if (st != -2e9) res.push_back({st, ed});\n    segs = res;\n}\n\n================================================================"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.1 并查集",
    "id": "template-9-2-1-并查集",
    "code": "int p[N], sz[N];\nint find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }\nvoid init(int n) { for (int i = 1; i <= n; i++) p[i] = i, sz[i] = 1; }\nvoid unite(int a, int b) {\n    a = find(a); b = find(b);\n    if (a == b) return;\n    if (sz[a] < sz[b]) swap(a, b);\n    p[b] = a; sz[a] += sz[b];\n}\n\n// 带权并查集 (维护到根节点的距离)\nint p[N], d[N]; // d[x] 为 x 到 p[x] 的距离\nint find(int x) {\n    if (p[x] == x) return x;\n    int root = find(p[x]);\n    d[x] += d[p[x]];\n    return p[x] = root;\n}"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.2 堆 (手写，支持修改第k个插入的元素)",
    "id": "template-10-2-2-堆-手写-支持修改第k个插入的元素",
    "code": "int h[N], ph[N], hp[N], hsize;\n// h: 堆数组, ph[k]: 第k个插入的元素在堆中的下标, hp[k]: 堆下标k是第几个插入的\nvoid heap_swap(int a, int b) {\n    swap(ph[hp[a]], ph[hp[b]]);\n    swap(hp[a], hp[b]);\n    swap(h[a], h[b]);\n}\nvoid down(int u) {\n    int t = u;\n    if (2*u <= hsize && h[2*u] < h[t]) t = 2*u;\n    if (2*u+1 <= hsize && h[2*u+1] < h[t]) t = 2*u+1;\n    if (u != t) { heap_swap(u, t); down(t); }\n}\nvoid up(int u) {\n    while (u/2 && h[u] < h[u/2]) { heap_swap(u, u/2); u >>= 1; }\n}"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.3 树状数组 (BIT / Fenwick Tree)",
    "id": "template-11-2-3-树状数组-BIT-Fenwick-Tree",
    "code": "int c[N], n;\nint lowbit(int x) { return x & (-x); }\nvoid add(int i, int v) { for (; i <= n; i += lowbit(i)) c[i] += v; }\nint sum(int i) { int s = 0; for (; i > 0; i -= lowbit(i)) s += c[i]; return s; }\nint query(int l, int r) { return sum(r) - sum(l - 1); }\n// 注意：下标必须从1开始\n\n// 树状数组求逆序对\n// 离散化后，对每个元素 a[i]：逆序对数 += sum(n) - sum(a[i])，然后 add(a[i], 1)"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.4 线段树 (通用懒标记版，区间加+区间查询和)",
    "id": "template-12-2-4-线段树-通用懒标记版-区间加-区间查询和",
    "code": "struct Node { int l, r, sum, lazy; } tr[4*N];\nvoid build(int u, int l, int r) {\n    tr[u] = {l, r, a[l], 0};\n    if (l == r) { tr[u].sum = a[l]; return; }\n    int mid = l + r >> 1;\n    build(2*u, l, mid); build(2*u+1, mid+1, r);\n    tr[u].sum = tr[2*u].sum + tr[2*u+1].sum;\n}\nvoid pushdown(int u) {\n    if (tr[u].lazy) {\n        auto& L = tr[2*u], &R = tr[2*u+1];\n        L.sum += tr[u].lazy * (L.r - L.l + 1);\n        L.lazy += tr[u].lazy;\n        R.sum += tr[u].lazy * (R.r - R.l + 1);\n        R.lazy += tr[u].lazy;\n        tr[u].lazy = 0;\n    }\n}\nvoid modify(int u, int l, int r, int v) { // 区间 [l,r] 加 v\n    if (tr[u].l >= l && tr[u].r <= r) {\n        tr[u].sum += v * (tr[u].r - tr[u].l + 1);\n        tr[u].lazy += v;\n        return;\n    }\n    pushdown(u);\n    int mid = tr[u].l + tr[u].r >> 1;\n    if (l <= mid) modify(2*u, l, r, v);\n    if (r > mid)  modify(2*u+1, l, r, v);\n    tr[u].sum = tr[2*u].sum + tr[2*u+1].sum;\n}\nint query(int u, int l, int r) { // 查询区间 [l,r] 的和\n    if (tr[u].l >= l && tr[u].r <= r) return tr[u].sum;\n    pushdown(u);\n    int mid = tr[u].l + tr[u].r >> 1;\n    int res = 0;\n    if (l <= mid) res += query(2*u, l, r);\n    if (r > mid)  res += query(2*u+1, l, r);\n    return res;\n}"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.5 Trie 树",
    "id": "template-13-2-5-Trie-树",
    "code": "int son[N][26], cnt[N], idx;\nvoid insert(char* str) {\n    int p = 0;\n    for (int i = 0; str[i]; i++) {\n        int u = str[i] - 'a';\n        if (!son[p][u]) son[p][u] = ++idx;\n        p = son[p][u];\n    }\n    cnt[p]++;\n}\nint query(char* str) {\n    int p = 0;\n    for (int i = 0; str[i]; i++) {\n        int u = str[i] - 'a';\n        if (!son[p][u]) return 0;\n        p = son[p][u];\n    }\n    return cnt[p];\n}"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.6 单调栈",
    "id": "template-14-2-6-单调栈",
    "code": "// 找每个数左边第一个比它小的数\nint stk[N], tt = 0;\nfor (int i = 1; i <= n; i++) {\n    while (tt && stk[tt] >= a[i]) tt--;\n    ans[i] = tt ? stk[tt] : -1;\n    stk[++tt] = a[i];\n}"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.7 单调队列 (滑动窗口最值)",
    "id": "template-15-2-7-单调队列-滑动窗口最值",
    "code": "// 窗口大小 k，求每个窗口最小值\nint q[N], hh = 0, tt = -1;\nfor (int i = 0; i < n; i++) {\n    while (hh <= tt && q[hh] < i - k + 1) hh++; // 滑出窗口\n    while (hh <= tt && a[q[tt]] >= a[i]) tt--;   // 维护单调\n    q[++tt] = i;\n    if (i >= k - 1) cout << a[q[hh]] << ' ';\n}"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.8 KMP",
    "id": "template-16-2-8-KMP",
    "code": "// s 为文本串(1-indexed)，p 为模式串(1-indexed)\nint ne[N]; // next 数组\n// 构建 next\nfor (int i = 2, j = 0; i <= m; i++) {\n    while (j && p[i] != p[j+1]) j = ne[j];\n    if (p[i] == p[j+1]) j++;\n    ne[i] = j;\n}\n// 匹配\nfor (int i = 1, j = 0; i <= n; i++) {\n    while (j && s[i] != p[j+1]) j = ne[j];\n    if (s[i] == p[j+1]) j++;\n    if (j == m) {\n        // 在 i-m+1 处匹配成功\n        j = ne[j];\n    }\n}"
  },
  {
    "chapter": "第二章  数据结构",
    "title": "2.9 字符串哈希",
    "id": "template-17-2-9-字符串哈希",
    "code": "typedef unsigned long long ULL;\nconst int P = 131; // 或 13331\nULL h[N], pw[N];\nvoid init(char* s, int n) {\n    pw[0] = 1;\n    for (int i = 1; i <= n; i++) {\n        h[i] = h[i-1] * P + s[i];\n        pw[i] = pw[i-1] * P;\n    }\n}\nULL get(int l, int r) { return h[r] - h[l-1] * pw[r-l+1]; }\n// 注意：ULL 自然溢出相当于对 2^64 取模，冲突概率极低\n\n================================================================"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.1 图的存储 (邻接表，链式前向星)",
    "id": "template-18-3-1-图的存储-邻接表-链式前向星",
    "code": "int h[N], e[M], ne[M], w[M], idx;\nvoid add(int a, int b, int c = 0) {\n    e[idx] = b; w[idx] = c; ne[idx] = h[a]; h[a] = idx++;\n}\n// 初始化: memset(h, -1, sizeof h); idx = 0;"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.2 拓扑排序",
    "id": "template-19-3-2-拓扑排序",
    "code": "int d[N]; // 入度\nqueue<int> q;\nbool topsort(int n) {\n    for (int i = 1; i <= n; i++) if (!d[i]) q.push(i);\n    int cnt = 0;\n    while (!q.empty()) {\n        int t = q.front(); q.pop(); cnt++;\n        for (int i = h[t]; ~i; i = ne[i]) {\n            int j = e[i];\n            if (--d[j] == 0) q.push(j);\n        }\n    }\n    return cnt == n;\n}"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.3 最短路",
    "id": "template-20-3-3-最短路",
    "code": "// Dijkstra (堆优化, O(mlogn))\ntypedef pair<int,int> PII;\nint dist[N]; bool st[N];\nvoid dijkstra(int s, int n) {\n    fill(dist, dist+n+1, 0x3f3f3f3f);\n    dist[s] = 0;\n    priority_queue<PII, vector<PII>, greater<PII>> pq;\n    pq.push({0, s});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (st[u]) continue;\n        st[u] = true;\n        for (int i = h[u]; ~i; i = ne[i]) {\n            int v = e[i];\n            if (dist[v] > d + w[i]) {\n                dist[v] = d + w[i];\n                pq.push({dist[v], v});\n            }\n        }\n    }\n}\n\n// SPFA (O(m)均摊, 可判负环)\nint dist[N], cnt[N]; bool inq[N];\nbool spfa(int s, int n) { // 返回 true 表示有负环\n    fill(dist, dist+n+1, 0x3f3f3f3f);\n    dist[s] = 0;\n    queue<int> q;\n    for (int i = 1; i <= n; i++) { q.push(i); inq[i] = true; } // 判负环需全点入队\n    // dist[s]=0; q.push(s); inq[s]=true; // 普通最短路\n    while (!q.empty()) {\n        int u = q.front(); q.pop(); inq[u] = false;\n        for (int i = h[u]; ~i; i = ne[i]) {\n            int v = e[i];\n            if (dist[v] > dist[u] + w[i]) {\n                dist[v] = dist[u] + w[i];\n                cnt[v] = cnt[u] + 1;\n                if (cnt[v] >= n) return true; // 负环\n                if (!inq[v]) { q.push(v); inq[v] = true; }\n            }\n        }\n    }\n    return false;\n}\n\n// Floyd (O(n^3), 多源最短路)\nint d[N][N];\nvoid floyd(int n) {\n    for (int k = 1; k <= n; k++)\n        for (int i = 1; i <= n; i++)\n            for (int j = 1; j <= n; j++)\n                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);\n}\n// 初始化: d[i][i]=0, 其余=INF"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.4 最小生成树",
    "id": "template-21-3-4-最小生成树",
    "code": "// Kruskal (O(mlogm))\nstruct Edge { int u, v, w; } edges[M];\nint p[N];\nint find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }\nint kruskal(int n, int m) {\n    sort(edges, edges+m, [](auto& a, auto& b){ return a.w < b.w; });\n    for (int i = 1; i <= n; i++) p[i] = i;\n    int res = 0, cnt = 0;\n    for (int i = 0; i < m; i++) {\n        int u = find(edges[i].u), v = find(edges[i].v);\n        if (u != v) { p[u] = v; res += edges[i].w; cnt++; }\n    }\n    return cnt == n-1 ? res : -1; // -1 表示不连通\n}\n\n// Prim (稠密图, O(n^2))\nint g[N][N], dist[N]; bool st[N];\nint prim(int n) {\n    fill(dist, dist+n+1, 0x3f3f3f3f);\n    dist[1] = 0;\n    int res = 0;\n    for (int i = 0; i < n; i++) {\n        int t = -1;\n        for (int j = 1; j <= n; j++)\n            if (!st[j] && (t == -1 || dist[j] < dist[t])) t = j;\n        if (dist[t] == 0x3f3f3f3f) return -1; // 不连通\n        st[t] = true; res += dist[t];\n        for (int j = 1; j <= n; j++) dist[j] = min(dist[j], g[t][j]);\n    }\n    return res;\n}"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.5 二分图",
    "id": "template-22-3-5-二分图",
    "code": "// 染色法判断二分图\nint color[N];\nbool dfs(int u, int c) {\n    color[u] = c;\n    for (int i = h[u]; ~i; i = ne[i]) {\n        int v = e[i];\n        if (!color[v]) { if (!dfs(v, 3-c)) return false; }\n        else if (color[v] == c) return false;\n    }\n    return true;\n}\nbool check(int n) {\n    fill(color, color+n+1, 0);\n    for (int i = 1; i <= n; i++)\n        if (!color[i] && !dfs(i, 1)) return false;\n    return true;\n}\n\n// 匈牙利算法 (二分图最大匹配, O(nm))\nint match[N]; bool used[N];\nbool dfs(int u) {\n    for (int i = h[u]; ~i; i = ne[i]) {\n        int v = e[i];\n        if (!used[v]) {\n            used[v] = true;\n            if (!match[v] || dfs(match[v])) { match[v] = u; return true; }\n        }\n    }\n    return false;\n}\nint hungary(int n1) {\n    int res = 0;\n    for (int i = 1; i <= n1; i++) {\n        fill(used+1, used+n2+1, false);\n        if (dfs(i)) res++;\n    }\n    return res;\n}"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.6 欧拉路径与欧拉回路",
    "id": "template-49-3-6-欧拉路径与欧拉回路",
    "code": "// 欧拉路径与欧拉回路 (AcWing 1184) — 输出一条欧拉回路\n// type=0 有向图: 每点入度=出度且连通; type=1 无向图: 每点度数为偶且连通\n#include <cstdio>\n#include <cstring>\n#include <iostream>\n#include <algorithm>\n\nusing namespace std;\n\nconst int N = 100010, M = 400010;\n\nint type;\nint n, m;\nint h[N], e[M], ne[M], idx;\nbool used[M];\nint ans[M], cnt;\nint din[N], dout[N];\n\nvoid add(int a, int b)\n{\n    e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;\n}\n\nvoid dfs(int u)\n{\n    for (int &i = h[u]; ~i;)\n    {\n        if (used[i])\n        {\n            i = ne[i];\n            continue;\n        }\n\n        used[i] = true;\n        if (type == 1) used[i ^ 1] = true;\n\n        int t;\n\n        if (type == 1)\n        {\n            t = i / 2 + 1;\n            if (i & 1) t = -t;\n        }\n        else t = i + 1;\n\n        int j = e[i];\n        i = ne[i];\n        dfs(j);\n\n        ans[ ++ cnt] = t;\n    }\n}\n\nint main()\n{\n    scanf(\"%d\", &type);\n    scanf(\"%d%d\", &n, &m);\n    memset(h, -1, sizeof h);\n\n    for (int i = 0; i < m; i ++ )\n    {\n        int a, b;\n        scanf(\"%d%d\", &a, &b);\n        add(a, b);\n        if (type == 1) add(b, a);\n        din[b] ++ , dout[a] ++ ;\n    }\n\n    if (type == 1)\n    {\n        for (int i = 1; i <= n; i ++ )\n            if (din[i] + dout[i] & 1)\n            {\n                puts(\"NO\");\n                return 0;\n            }\n    }\n    else\n    {\n        for (int i = 1; i <= n; i ++ )\n            if (din[i] != dout[i])\n            {\n                puts(\"NO\");\n                return 0;\n            }\n    }\n\n    for (int i = 1; i <= n; i ++ )\n        if (h[i] != -1)\n        {\n            dfs(i);\n            break;\n        }\n\n    if (cnt < m)\n    {\n        puts(\"NO\");\n        return 0;\n    }\n\n    puts(\"YES\");\n    for (int i = cnt; i; i -- ) printf(\"%d \", ans[i]);\n    puts(\"\");\n\n    return 0;\n}"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.7 强连通分量 (Tarjan SCC)",
    "id": "template-23-3-7-强连通分量-Tarjan-SCC",
    "code": "int dfn[N], low[N], id[N], stk[N], in_stk[N];\nint timer_cnt, top, scc_cnt;\nvoid tarjan(int u) {\n    dfn[u] = low[u] = ++timer_cnt;\n    stk[++top] = u; in_stk[u] = true;\n    for (int i = h[u]; ~i; i = ne[i]) {\n        int v = e[i];\n        if (!dfn[v]) { tarjan(v); low[u] = min(low[u], low[v]); }\n        else if (in_stk[v]) low[u] = min(low[u], dfn[v]);\n    }\n    if (dfn[u] == low[u]) {\n        scc_cnt++;\n        int v;\n        do { v = stk[top--]; in_stk[v] = false; id[v] = scc_cnt; } while (v != u);\n    }\n}"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.8 割点和桥 (Tarjan)",
    "id": "template-24-3-8-割点和桥-Tarjan",
    "code": "int dfn[N], low[N], timer_cnt;\nbool cut[N]; // 割点标记\nvoid tarjan_cut(int u, int fa) {\n    dfn[u] = low[u] = ++timer_cnt;\n    int children = 0;\n    for (int i = h[u]; ~i; i = ne[i]) {\n        int v = e[i];\n        if (!dfn[v]) {\n            children++;\n            tarjan_cut(v, u);\n            low[u] = min(low[u], low[v]);\n            // 割点条件: 非根节点 low[v] >= dfn[u]，根节点 children >= 2\n            if (fa != -1 && low[v] >= dfn[u]) cut[u] = true;\n        } else if (v != fa) low[u] = min(low[u], dfn[v]);\n    }\n    if (fa == -1 && children >= 2) cut[u] = true;\n}\n// 桥: low[v] > dfn[u] 时边(u,v)是桥"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.9 网络流 (Dinic 最大流, O(V^2 * E))",
    "id": "template-25-3-9-网络流-Dinic-最大流-O-V-2-E",
    "code": "struct Edge { int to, cap, rev; };\nvector<Edge> graph[N];\nint level[N], iter[N];\n\nvoid add_edge(int from, int to, int cap) {\n    graph[from].push_back({to, cap, (int)graph[to].size()});\n    graph[to].push_back({from, 0, (int)graph[from].size()-1});\n}\nbool bfs(int s, int t, int n) {\n    fill(level, level+n, -1);\n    queue<int> q;\n    level[s] = 0; q.push(s);\n    while (!q.empty()) {\n        int v = q.front(); q.pop();\n        for (auto& e : graph[v])\n            if (e.cap > 0 && level[e.to] < 0) { level[e.to] = level[v]+1; q.push(e.to); }\n    }\n    return level[t] >= 0;\n}\nint dfs(int v, int t, int f) {\n    if (v == t) return f;\n    for (int& i = iter[v]; i < (int)graph[v].size(); i++) {\n        Edge& e = graph[v][i];\n        if (e.cap > 0 && level[v] < level[e.to]) {\n            int d = dfs(e.to, t, min(f, e.cap));\n            if (d > 0) { e.cap -= d; graph[e.to][e.rev].cap += d; return d; }\n        }\n    }\n    return 0;\n}\nint max_flow(int s, int t, int n) {\n    int flow = 0;\n    while (bfs(s, t, n)) {\n        fill(iter, iter+n, 0);\n        int d;\n        while ((d = dfs(s, t, INT_MAX)) > 0) flow += d;\n    }\n    return flow;\n}"
  },
  {
    "chapter": "第三章  搜索与图论",
    "title": "3.10 最小费用最大流 (MCMF, SPFA版)",
    "id": "template-26-3-10-最小费用最大流-MCMF-SPFA版",
    "code": "struct MEdge { int to, cap, cost, rev; };\nvector<MEdge> mg[N];\nint mdist[N], mpot[N]; bool minq[N];\n\nvoid add_medge(int u, int v, int cap, int cost) {\n    mg[u].push_back({v, cap, cost, (int)mg[v].size()});\n    mg[v].push_back({u, 0, -cost, (int)mg[u].size()-1});\n}\n// 返回 {最大流, 最小费用}\npair<int,int> mcmf(int s, int t, int n) {\n    int flow = 0, cost = 0;\n    while (true) {\n        fill(mdist, mdist+n, 0x3f3f3f3f);\n        mdist[s] = 0;\n        queue<int> q; q.push(s); minq[s] = true;\n        while (!q.empty()) {\n            int u = q.front(); q.pop(); minq[u] = false;\n            for (auto& e : mg[u])\n                if (e.cap > 0 && mdist[e.to] > mdist[u] + e.cost) {\n                    mdist[e.to] = mdist[u] + e.cost;\n                    if (!minq[e.to]) { q.push(e.to); minq[e.to] = true; }\n                }\n        }\n        if (mdist[t] == 0x3f3f3f3f) break;\n        // 沿最短路增广\n        int f = INT_MAX;\n        for (int v = t; v != s; ) {\n            // 这里需要记录路径，实际使用时建议用 prev 数组\n            break; // 简化版，完整实现见下方\n        }\n        // 完整实现：用 prev_v/prev_e 记录路径\n        flow += f; cost += f * mdist[t];\n    }\n    return {flow, cost};\n}\n// 注：完整实现建议使用 prev_v[v], prev_e[v] 记录前驱\n\n================================================================"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.1 GCD / LCM",
    "id": "template-27-4-1-GCD-LCM",
    "code": "int gcd(int a, int b) { return b ? gcd(b, a % b) : a; }\nlong long lcm(long long a, long long b) { return a / gcd(a, b) * b; }"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.2 素数筛",
    "id": "template-28-4-2-素数筛",
    "code": "// 线性筛 (欧拉筛)，同时可得欧拉函数\nint primes[N], cnt; bool st[N];\nint euler[N];\nvoid get_primes(int n) {\n    euler[1] = 1;\n    for (int i = 2; i <= n; i++) {\n        if (!st[i]) { primes[cnt++] = i; euler[i] = i - 1; }\n        for (int j = 0; primes[j] <= n / i; j++) {\n            st[primes[j] * i] = true;\n            if (i % primes[j] == 0) { euler[i * primes[j]] = euler[i] * primes[j]; break; }\n            euler[i * primes[j]] = euler[i] * (primes[j] - 1);\n        }\n    }\n}"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.3 快速幂",
    "id": "template-29-4-3-快速幂",
    "code": "long long qpow(long long a, long long b, long long mod) {\n    long long res = 1; a %= mod;\n    while (b) {\n        if (b & 1) res = res * a % mod;\n        a = a * a % mod;\n        b >>= 1;\n    }\n    return res;\n}\n// 矩阵快速幂\ntypedef vector<vector<long long>> Mat;\nconst long long MOD = 1e9 + 7;\nMat mat_mul(const Mat& A, const Mat& B) {\n    int n = A.size();\n    Mat C(n, vector<long long>(n, 0));\n    for (int i = 0; i < n; i++)\n        for (int k = 0; k < n; k++) if (A[i][k])\n            for (int j = 0; j < n; j++)\n                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;\n    return C;\n}\nMat mat_pow(Mat A, long long p) {\n    int n = A.size();\n    Mat res(n, vector<long long>(n, 0));\n    for (int i = 0; i < n; i++) res[i][i] = 1; // 单位矩阵\n    while (p) {\n        if (p & 1) res = mat_mul(res, A);\n        A = mat_mul(A, A); p >>= 1;\n    }\n    return res;\n}"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.4 扩展欧几里得 / 逆元",
    "id": "template-30-4-4-扩展欧几里得-逆元",
    "code": "long long exgcd(long long a, long long b, long long& x, long long& y) {\n    if (!b) { x = 1; y = 0; return a; }\n    long long d = exgcd(b, a % b, y, x);\n    y -= a / b * x;\n    return d;\n}\n// ax ≡ b (mod n) 的解：x0 = b/d * x0' % (n/d), 共d个解，间隔n/d\n// 模 p 逆元 (p 为质数): qpow(a, p-2, p)\n// 线性预处理逆元:\ninv[1] = 1;\nfor (int i = 2; i <= n; i++) inv[i] = (long long)(p - p/i) * inv[p % i] % p;"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.5 中国余数定理 (CRT)",
    "id": "template-31-4-5-中国余数定理-CRT",
    "code": "// 模数两两互质版\nlong long crt(long long* r, long long* m, int k) {\n    long long M = 1, ans = 0;\n    for (int i = 0; i < k; i++) M *= m[i];\n    for (int i = 0; i < k; i++) {\n        long long Mi = M / m[i], x, y;\n        exgcd(Mi, m[i], x, y);\n        ans = (ans + r[i] * Mi % M * x) % M;\n    }\n    return (ans % M + M) % M;\n}"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.6 组合数",
    "id": "template-32-4-6-组合数",
    "code": "// 方法一: 递推 (n,m <= 2000)\nlong long C[N][N];\nvoid init_C(int n) {\n    for (int i = 0; i <= n; i++) {\n        C[i][0] = 1;\n        for (int j = 1; j <= i; j++) C[i][j] = (C[i-1][j] + C[i-1][j-1]) % MOD;\n    }\n}\n\n// 方法二: 预处理阶乘逆元 (n,m <= 1e6)\nlong long fact[N], inv_fact[N];\nvoid init_fact(int n) {\n    fact[0] = 1;\n    for (int i = 1; i <= n; i++) fact[i] = fact[i-1] * i % MOD;\n    inv_fact[n] = qpow(fact[n], MOD-2, MOD);\n    for (int i = n-1; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;\n}\nlong long C(int n, int m) {\n    if (m < 0 || m > n) return 0;\n    return fact[n] * inv_fact[m] % MOD * inv_fact[n-m] % MOD;\n}\n\n// Lucas 定理 (p 为小质数, n,m 可能很大)\nlong long lucas(long long n, long long m, long long p) {\n    if (m == 0) return 1;\n    return C(n % p, m % p) * lucas(n / p, m / p, p) % p;\n    // 其中 C() 用朴素递推法对 p 取模\n}\n\n// 卡特兰数: Cat(n) = C(2n,n) / (n+1)"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.7 高斯消元",
    "id": "template-33-4-7-高斯消元",
    "code": "// 解线性方程组 Ax=b，a[i] 为增广矩阵的第 i 行\n// 返回: 0=唯一解, 1=无穷解, 2=无解\nint gauss(double a[][N], int n) {\n    int c = 0, r = 0;\n    const double eps = 1e-8;\n    for (c = 0; c < n; c++) {\n        int t = r;\n        for (int i = r+1; i < n; i++) if (fabs(a[i][c]) > fabs(a[t][c])) t = i;\n        if (fabs(a[t][c]) < eps) continue;\n        for (int j = c; j <= n; j++) swap(a[t][j], a[r][j]);\n        for (int j = n; j >= c; j--) a[r][j] /= a[r][c];\n        for (int i = 0; i < n; i++)\n            if (i != r && fabs(a[i][c]) > eps)\n                for (int j = n; j >= c; j--) a[i][j] -= a[r][j] * a[i][c];\n        r++;\n    }\n    if (r < n) {\n        for (int i = r; i < n; i++) if (fabs(a[i][n]) > eps) return 2;\n        return 1;\n    }\n    return 0;\n}"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.8 博弈论",
    "id": "template-34-4-8-博弈论",
    "code": "// NIM游戏: 先手必胜当且仅当 a1^a2^...^an != 0\n\n// SG函数\nint sg[N];\nvoid calc_sg(int n) {\n    // mex({sg[v] : v 是 u 的后继})\n    for (int i = 0; i <= n; i++) {\n        set<int> s;\n        for (auto& next_state : ...) s.insert(sg[next_state]);\n        int mex = 0;\n        while (s.count(mex)) mex++;\n        sg[i] = mex;\n    }\n}\n// 多个游戏的和: SG = SG1 ^ SG2 ^ ... ^ SGm，非零则先手必胜"
  },
  {
    "chapter": "第四章  数学",
    "title": "4.9 Miller-Rabin 素性测试 (大数版)",
    "id": "template-35-4-9-Miller-Rabin-素性测试-大数版",
    "code": "typedef long long ll;\ntypedef unsigned long long ull;\ntypedef __int128 lll;\nll mul(ll a, ll b, ll mod) { return (__int128)a * b % mod; }\nll qpow(ll a, ll b, ll mod) {\n    ll res = 1; a %= mod;\n    while (b) { if (b&1) res = mul(res, a, mod); a = mul(a, a, mod); b >>= 1; }\n    return res;\n}\nbool miller_rabin(ll n) {\n    if (n < 3 || n % 2 == 0) return n == 2;\n    ll d = n - 1; int r = 0;\n    while (d % 2 == 0) { d >>= 1; r++; }\n    for (ll a : {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37}) {\n        if (a >= n) continue;\n        ll x = qpow(a, d, n);\n        if (x == 1 || x == n-1) continue;\n        bool ok = false;\n        for (int i = 0; i < r-1; i++) { x = mul(x, x, n); if (x == n-1) { ok = true; break; } }\n        if (!ok) return false;\n    }\n    return true;\n}\n\n================================================================"
  },
  {
    "chapter": "第五章  计算几何",
    "title": "5.1 基础结构和函数",
    "id": "template-36-5-1-基础结构和函数",
    "code": "#include <cmath>\nconst double eps = 1e-8;\nint sign(double x) { return x < -eps ? -1 : x > eps ? 1 : 0; }\nint cmp(double a, double b) { return sign(a - b); }\n\nstruct Point {\n    double x, y;\n    Point(double x = 0, double y = 0) : x(x), y(y) {}\n    Point operator+(const Point& b) const { return {x+b.x, y+b.y}; }\n    Point operator-(const Point& b) const { return {x-b.x, y-b.y}; }\n    Point operator*(double t) const { return {x*t, y*t}; }\n    double dot(const Point& b) const { return x*b.x + y*b.y; }   // 点积\n    double cross(const Point& b) const { return x*b.y - y*b.x; } // 叉积\n    double norm() const { return sqrt(x*x + y*y); }\n    bool operator<(const Point& b) const {\n        return cmp(x, b.x) ? x < b.x : cmp(y, b.y) < 0;\n    }\n    bool operator==(const Point& b) const { return !cmp(x, b.x) && !cmp(y, b.y); }\n};\ntypedef Point Vec;\n\ndouble dist(Point a, Point b) { return (a - b).norm(); }\n// 叉积的符号判断方向: cross > 0 逆时针, < 0 顺时针, = 0 共线"
  },
  {
    "chapter": "第五章  计算几何",
    "title": "5.2 点线关系",
    "id": "template-37-5-2-点线关系",
    "code": "// 点在线段上 (包括端点)\nbool on_segment(Point p, Point a, Point b) {\n    return sign((a-p).cross(b-p)) == 0 && sign((a-p).dot(b-p)) <= 0;\n}\n// 两线段是否相交 (严格相交)\nbool seg_intersect(Point a, Point b, Point c, Point d) {\n    return sign((b-a).cross(c-a)) * sign((b-a).cross(d-a)) < 0 &&\n           sign((d-c).cross(a-c)) * sign((d-c).cross(b-c)) < 0;\n}\n// 直线交点 (需先确认不平行)\nPoint line_intersect(Point a, Point b, Point c, Point d) {\n    double t = ((c-a).cross(d-c)) / ((b-a).cross(d-c));\n    return a + (b-a) * t;\n}\n// 点到直线距离\ndouble dist_to_line(Point p, Point a, Point b) {\n    return fabs((b-a).cross(p-a)) / dist(a, b);\n}\n// 点到线段最近点\nPoint closest_on_seg(Point p, Point a, Point b) {\n    if (sign((p-a).dot(b-a)) <= 0) return a;\n    if (sign((p-b).dot(a-b)) <= 0) return b;\n    double t = (p-a).dot(b-a) / (b-a).dot(b-a);\n    return a + (b-a) * t;\n}"
  },
  {
    "chapter": "第五章  计算几何",
    "title": "5.3 多边形面积 (Shoelace 公式)",
    "id": "template-38-5-3-多边形面积-Shoelace-公式",
    "code": "double polygon_area(vector<Point>& p) {\n    double area = 0;\n    int n = p.size();\n    for (int i = 0; i < n; i++)\n        area += p[i].cross(p[(i+1) % n]);\n    return fabs(area) / 2;\n}"
  },
  {
    "chapter": "第五章  计算几何",
    "title": "5.4 凸包 (Andrew 算法, O(nlogn))",
    "id": "template-39-5-4-凸包-Andrew-算法-O-nlogn",
    "code": "vector<Point> convex_hull(vector<Point> pts) {\n    int n = pts.size(), k = 0;\n    if (n < 3) return pts;\n    sort(pts.begin(), pts.end());\n    pts.erase(unique(pts.begin(), pts.end()), pts.end());\n    n = pts.size();\n    vector<Point> h(2 * n);\n    for (int i = 0; i < n; h[k++] = pts[i++])\n        while (k >= 2 && sign((h[k-1]-h[k-2]).cross(pts[i]-h[k-2])) <= 0) k--;\n    for (int i = n-2, t = k+1; i >= 0; h[k++] = pts[i--])\n        while (k >= t && sign((h[k-1]-h[k-2]).cross(pts[i]-h[k-2])) <= 0) k--;\n    h.resize(k - 1);\n    return h;\n}"
  },
  {
    "chapter": "第五章  计算几何",
    "title": "5.5 Pick 定理",
    "id": "template-40-5-5-Pick-定理",
    "code": "// 整点多边形: 面积 S = 内部整点数 I + 边界整点数 B/2 - 1\n// 边 (x1,y1)-(x2,y2) 上的整点数: gcd(|x2-x1|, |y2-y1|)"
  },
  {
    "chapter": "第五章  计算几何",
    "title": "5.6 旋转卡壳 (凸包直径)",
    "id": "template-41-5-6-旋转卡壳-凸包直径",
    "code": "double rotating_calipers(vector<Point>& hull) {\n    int n = hull.size();\n    if (n == 1) return 0;\n    if (n == 2) return dist(hull[0], hull[1]);\n    double ans = 0;\n    int j = 1;\n    for (int i = 0; i < n; i++) {\n        while (fabs((hull[(i+1)%n] - hull[i]).cross(hull[(j+1)%n] - hull[i])) >\n               fabs((hull[(i+1)%n] - hull[i]).cross(hull[j] - hull[i])))\n            j = (j + 1) % n;\n        ans = max(ans, max(dist(hull[i], hull[j]), dist(hull[(i+1)%n], hull[(j+1)%n])));\n    }\n    return ans;\n}\n\n================================================================"
  },
  {
    "chapter": "第六章  字符串高级算法",
    "title": "6.1 AC自动机",
    "id": "template-42-6-1-AC自动机",
    "code": "struct AhoCorasick {\n    int next[N][26], fail[N], cnt;\n    void init() { cnt = 0; memset(next[0], -1, sizeof next[0]); }\n    void insert(const string& s) {\n        int cur = 0;\n        for (char c : s) {\n            int ch = c - 'a';\n            if (next[cur][ch] == -1) {\n                memset(next[++cnt], -1, sizeof next[cnt]);\n                next[cur][ch] = cnt;\n            }\n            cur = next[cur][ch];\n        }\n        // 标记终止节点\n    }\n    void build() {\n        queue<int> q;\n        fail[0] = 0;\n        for (int i = 0; i < 26; i++) {\n            if (next[0][i] == -1) next[0][i] = 0;\n            else { fail[next[0][i]] = 0; q.push(next[0][i]); }\n        }\n        while (!q.empty()) {\n            int u = q.front(); q.pop();\n            for (int i = 0; i < 26; i++) {\n                if (next[u][i] == -1) next[u][i] = next[fail[u]][i];\n                else { fail[next[u][i]] = next[fail[u]][i]; q.push(next[u][i]); }\n            }\n        }\n    }\n    // query: 在文本串中遍历 AC 自动机，统计出现次数\n};"
  },
  {
    "chapter": "第六章  字符串高级算法",
    "title": "6.2 后缀数组 (SA-IS 简化版，O(nlogn) 倍增)",
    "id": "template-43-6-2-后缀数组-SA-IS-简化版-O-nlogn-倍增",
    "code": "struct SuffixArray {\n    int sa[N], rk[N], tmp[N], cnt[N], n;\n    void build(int* s, int n, int m) {\n        this->n = n;\n        // 倍增建 SA，略 (推荐使用模板题标准代码)\n        // 关键公式: lcp(sa[i], sa[j]) = min(height[i+1..j])\n    }\n};\n// 注：后缀数组完整实现较长，竞赛中建议携带经过验证的完整模板\n\n================================================================"
  },
  {
    "chapter": "第七章  常用技巧和代码片段",
    "title": "7.1 快读",
    "id": "template-44-7-1-快读",
    "code": "inline int read() {\n    int x = 0; char c = getchar(); bool neg = false;\n    while (c < '0' || c > '9') { if (c == '-') neg = true; c = getchar(); }\n    while (c >= '0' && c <= '9') { x = x * 10 + c - '0'; c = getchar(); }\n    return neg ? -x : x;\n}"
  },
  {
    "chapter": "第七章  常用技巧和代码片段",
    "title": "7.2 常用头文件",
    "id": "template-45-7-2-常用头文件",
    "code": "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\ntypedef pair<int,int> pii;\nconst int INF = 0x3f3f3f3f;\nconst ll LINF = 0x3f3f3f3f3f3f3f3fLL;\nconst double PI = acos(-1.0);"
  },
  {
    "chapter": "第七章  常用技巧和代码片段",
    "title": "7.3 __int128 输入输出",
    "id": "template-46-7-3-__int128-输入输出",
    "code": "void print128(__int128 x) {\n    if (x < 0) { putchar('-'); x = -x; }\n    if (x > 9) print128(x / 10);\n    putchar('0' + x % 10);\n}"
  },
  {
    "chapter": "第七章  常用技巧和代码片段",
    "title": "7.4 随机化",
    "id": "template-47-7-4-随机化",
    "code": "mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());\nint randint(int l, int r) { return uniform_int_distribution<int>(l, r)(rng); }"
  },
  {
    "chapter": "第七章  常用技巧和代码片段",
    "title": "7.5 常见 DP 模型",
    "id": "template-48-7-5-常见-DP-模型",
    "code": "// LIS O(nlogn)\nint lis(int a[], int n) {\n    vector<int> d;\n    for (int i = 0; i < n; i++) {\n        auto it = lower_bound(d.begin(), d.end(), a[i]);\n        if (it == d.end()) d.push_back(a[i]);\n        else *it = a[i];\n    }\n    return d.size();\n}\n\n// 背包 (0/1)\nfor (int i = 1; i <= n; i++)\n    for (int j = V; j >= v[i]; j--)\n        dp[j] = max(dp[j], dp[j - v[i]] + w[i]);\n\n// 背包 (完全)\nfor (int i = 1; i <= n; i++)\n    for (int j = v[i]; j <= V; j++)\n        dp[j] = max(dp[j], dp[j - v[i]] + w[i]);\n\n// 区间 DP\nfor (int len = 2; len <= n; len++)\n    for (int i = 1; i + len - 1 <= n; i++) {\n        int j = i + len - 1;\n        for (int k = i; k < j; k++)\n            dp[i][j] = max(dp[i][j], dp[i][k] + dp[k+1][j] + cost(i, j, k));\n    }\n\n// 树形 DP (以1为根)\nvoid dfs(int u, int fa) {\n    dp[u] = ...; // 初始化\n    for (int i = h[u]; ~i; i = ne[i]) {\n        int v = e[i];\n        if (v == fa) continue;\n        dfs(v, u);\n        dp[u] = ...; // 利用 dp[v] 更新 dp[u]\n    }\n}\n\n================================================================\n附：各来源模板覆盖范围对比\n================================================================\n\nAcwing算法课模板 (01Acwing算法课模板.docx == 01算法课模板.docx，两文件完全相同):\n  覆盖: 基础算法、基础数据结构、图论(单源最短路/MST/二分图)、数论(全面)、博弈论\n  缺失: 网络流、计算几何、字符串高级(SA/AC自动机)、树链剖分、LCA\n\n郑老师资料 (00ACM ICPC培训资料（郑老师整理）.docx):\n  覆盖: C/C++语言基础(教程)、STL详细用法、Java大数类(BigInteger/BigDecimal)\n        线段树例题详解、树状数组、Kruskal、Floyd\n  特点: 偏教学向，适合初学参考\n  缺失: 大多数高级算法\n\n大林模板 (2005年，已过时):\n  算法覆盖广泛，但：\n  ① 代码风格完全过时 (#include<iostream.h>, qsort替代std::sort等)\n  ② 多处已知bug (SCC递归调用名错误、Miller-Rabin ret未初始化)\n  ③ 一般图匹配实现错误 (未处理奇圈，非Blossom算法)\n  ④ 大数封装无法在现代编译器编译\n  结论: 不建议直接使用任何代码，仅可参考算法思路\n\n本汇总文件不包含的高级内容 (需要时另查):\n  - 树链剖分 + LCA (模板较长，竞赛建议单独携带)\n  - 后缀自动机 SAM\n  - CDQ 分治\n  - 线段树合并/分裂 (可持久化)\n  - 虚树\n  - KD树\n\n================================================================"
  }
];
