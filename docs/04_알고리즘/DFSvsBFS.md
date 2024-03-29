# DFS vs BFS

## BFS (Breathed First Search)

- 너비 우선 탐색 알고리즘

### BFS 장점

- 답이 되는 경로가 여러 개인 경우 최단 경로
- 최적해를 찾음을 보장한다.
- 노드 수가 적고 깊이가 얕은 해가 존재할 때 유리

### BFS 단점

- 최소 실행시간보다는 오래 걸린다는 것이 거의 확실하다.
- 최악의 경우, 실행에 가장 긴 시간이 걸릴 수 있다.
- 재귀호출을 사용하는 DFS와 달리 큐를 이용해 다음에 탐색 할 노드들을 저장하므로 노드의 수가 많을 수록 큰 저장 공간 필요
- 노드의 수가 늘어나면 탐색해야하는 노드가 많아지므로 비효율적

## DFS (Depth Frist Search)

- 깊이 우선 탐색 알고리즘
- 경로의 특징을 저장해둬야 하는 문제

1. 모든 노드를 방문하고자 하는 경우에 이 방법을 선택함
2. 깊이 우선 탐색(DFS)이 너비 우선 탐색(BFS)보다 좀 더 간단함
3. 검색 속도 자체는 너비 우선 탐색(BFS)에 비해서 느림

### DFS 장점

- 최선의 경우, 가장 빠른 알고리즘이다.
- ‘운 좋게’ 항상 해에 도달하는 올바른 경로를 선택한다면, 깊이 우선 탐색이 최소 실행시간에 해를 찾는다.
- BFS에 비해 저장공간의 필요성이 적다. 백트래킹을 해야하는 노드들만 저장하면 된다.
- 찾아야 하는 노드가 깊은 단계에 있을 수록, 또 좌측에 있을 수록 BFS보다 빠르다

### DFS 단점

- 찾은 해가 최단 경로라는 보장이 없다.
- 최악의 경우, 가능한 모든 경로를 탐험하고서야 해를 찾으므로, 해에 도달하는 데 가장 오랜 시간이 걸린다.

<br>
<br>
<br>

<출처>

- <https://velog.io/@vagabondms/DFS-vs-BFS>
- <https://wikidocs.net/123117>
- <https://devuna.tistory.com/32>
