### 블록체인에서의 대용량 파일
- 블록체인에는 데이터를 저장하거나 대용량 파일을 저장할 수 없다.
- 두 사람 간 거래가 발생하는 단순한 내용의 문자열만 유지할 뿐이다.
- 대용량 파일이나 이미지를 어떻게 저장할 수 있을까?

# IPFS (InterPlanetary File System)
- 각 노드에 `해시` 파일을 저장하는 P2P 프로토콜로서 공용 네트워크이다.
- 어떤 파일이 필요한 사용자가 추상레이어에 접근하여 파일의 `해시`를 호출하면 IPFS는 노드에서 파일을 찾아 사용자에게 전달한다.

## 작동 방식
<img src="05_ETC/img/ipfs1.png" width="50%" />

- A가 PDF 파일을 IPFS에 올린다.
- A는 자신의 워킹 디렉토리에 파일을 놓는다.
- IPFS에게 파일 등록을 요청하면 파일의 해시를 생성한다.
- IPFS 네트워크에서 누구나 해시 값을 알면 파일에 접근 가능하다.
<br>


## 보안 문제
- IPFS 네트워크에 참여하는 노드는 `CID(전역적으로 일관된 콘텐츠 주소)`에 연결된 데이터를 저장하고 있다.
- 그리고 공개적으로 볼 수 있는 `분산 해시 테이블(DHT)`을 통해 다른 노드에서 사용할 수 있는 `CID`를 보유하고 있음을 알린다.

- IPFS는 본질적으로 네트워크의 총 가용 데이터의 globally 분산된 '서버'이며, 콘텐츠 자체(CIDs)와 콘텐츠를 갖고 있거나 원하는 참가자들에 의해 참조될 수 있다.
  - 그렇지만, IPFS 자체는 `CID`에 대한 정보와 `CID`를 제공하고 원하는 노드들을 명시적으로 보호하지 않는다.
  - IPFS의 고유한 특징이 아니라 분산 웹의 흔한 특징인데 트래픽이나 메타데이터는 네트워크와 사용자들에 의해 모니터링 될 수 있다.
    - 노드 간 IPFS 트래픽이 암호화되는 반면에 
    - 해당 노드가 `DHT`에 게시하는 메타데이터는 공개된다.
    - 노드는 고유한 노드 식별자(Peer ID) 및 제공하는 데이터의 `CID`등 `DHT` 기능에 필수적인 다양한 정보를 공개한다.(public available)
<br>

### 왜 IPFS 프로토콜 자체에 명시적으로 개인 정보 보호 계층이 내장되어 있지 않은가?
- 이는 프로토콜의 고도로 모듈화된 설계의 핵심 원칙과 일치한다.

  - IPFS의 각기 다른 Uses은 Privacy에 대한 각기 다른 접근 방식을 요구할 수 있다.
  - IPFS 코어 안에 Privacy에 대한 접근 방식을 명시적으로 구현하면 모듈화, 유연성 및 미래 보장성의 부족으로 인해 미래의 builders를 box-in 할 수 있다. (사용하기 힘들게 할 수 있다.)
  - 반면, IPFS 기반 사용자들이 당면한 상황에 가장 적합한 각자의 Privacy 접근법을 사용하도록 하면 가능한 많은 사용자가 유용하게 IPFS를 사용할 수 있게 된다.

- 그래서 사용자들은 추가적인 방법들을 취할 수 있다.
  - 재제공 금지 (disabling reproviding)
  - 민감한 정보 암호화 (encrypting sensitive content)
  - private한 IPFS 네트워크 구축 (running a private IPFS network)

<br>

## What's public on IPFS
- 파일 내용을 포함한 IPFS의 모든 트래픽은 암호화하지 않는 한 공개적이다.

### Content identifiers (CID)
- IPFS는 기존 웹의 위치 주소 대신에 콘텐츠의 주소를 사용한다.
- IPFS 네트워크에 저장된 데이터의 각각의 조각들은 자신의 유일한 콘텐츠 식별자(CID)를 갖는다. 
- `CID`와 관련된 복사본은 IPFS에 참여하는 노드의 전 세계 여러 위치에 저장할 수 있다.
- IPFS는 특정 `CID`와 관련된 데이터를 검색하기 위해서 `분산 해시 테이블(DHT)`을 사용하여 저장된 위치를 추적한다.
- 특정 `CID`를 검색하면 노드가 `DHT`에 쿼리하여 해당 항목과 가장 가까운 노드를 찾는다.
- 기본적으로 'Garbage collection'이 한동안 사용하지 않은 콘텐츠의 캐시를 지우기 전까지(limitied time)는 그 콘텐츠를 다른 노드들에 다시 제공한다고 동의한다.
- 또한, CID를 'Garbage collection' 되지 않도록 'pin' 할 수 있다. (영구적 재생산자 역할)
<br>

- 이것이 기존 웹 호스팅에 비해 IPFS의 장점 중 하나인데 네트워크의 많은 노드에 있는 널리 사용되는 파일을 검색하는 것이 빠르고 대역폭도 효율적이다.
- 하지만, DHT 쿼리들은 모니터링 될 수 있다는 것에 유의해야 한다.

### Node identifiability
- 노드의 식별자 자체도 공개된다.
- `DHT`가 사용자의 `PeerID`를 찾아볼 수 있음을 유의해야 한다.
  - 특히 노드가 정기적으로 같은 위치에서 실행되다면 해당 노드의 IP 주소를 찾을 수 있다.
  - 'PeerID'를 재설정 할 수 있지만, 기존 웹 앱 및 서비스에서 사용자 ID를 변경하는 것처럼 추가적인 작업이 필요할 수 있다.
  - 또한, 공용 IPFS 네트워크를 장기간 모니터링하면 노드가 요청하거나 다시 제공하는 `CID`와 시기 등을 알 수 있다.
<br><br>

# 비공개로 유지해야 하지만 IPFS를 사용해야 할 때
## 1. Controlling what you share
- 기본적으로 IPFS 노드는 네트워크의 나머지 부분에 자신의 캐시에 있는 모든 `CID`를 공유한다고 알린다.
  - 즉, 다른 노드로 부터 언은 콘텐츠를 다시 제공할 것 임을 알림
  - as well as CIDs that you've explicitly pinned or added to MFS to make them consistently available. 

- 이 동작을 사용하지 않도록 설정하기
  - reprovider settings of your node's config file


## 2. Using a public gateway
- 공용 IPFS 게이트웨이를 사용하면 로컬 노드에 대한 정보를 노출하지 않고 IPFS 호스트 콘텐츠를 요청할 수 있다.
  - 로컬 노드를 사용하지 않기 때문
  - 하지만, IPFS 네트워크에 완전히 참여할 수 있는 모든 이점을 누릴 순 없다.

- 공용 IPFS 게이트웨이는 주로 기존 웹과 분산 웹을 연결하는 '다리' 역할을 한다.
- 일반 웹 클라이언트가 HTTP를 통해 IPFS 호스팅된 콘텐츠를 요청할 수 있다.
- 하지만 공용 게이트웨이를 통해서만 콘텐츠를 요청하면 IPFS 네트워크 일부가 아니다.
  - 단지 게이트웨이는 사용자를 대신하는 네트워크 참여자이다.
 
- 게이트웨이 운영자가 게이트웨이를 사용하는 IP 주소를 추적하고 CID가 요청된 주소와 연관시키는 등의 자체적인 개인 메트릭을 수집할 수 있다.
- 게이트웨이를 통해 요청된 콘텐츠는 공용 DHT에서 볼 수 있지만, 누가 요청했는지 알 수는 없다.

## 3. Using Tor
- `Tor(새 창 열기)`와 command line이 익숙하면 노드 설정을 구성하여 Tor 전송을 통해 IPFS를 실행할 수 있다.

## 4. Encryption
- 네트워크에는 `전송 암호화`와 `콘텐츠 암호화` 2 종류가 있다.

<img src="05_ETC/img/ipfs2.png" width="50%"/>

- `전송 암호화`
  - 양 당사자 간에 데이터를 전송할 때 사용한다.
  - 데이터가 한 장소에서 다른 곳으로 이동하는 동안 제 3자가 볼 수 없다.
<br>

<img src="05_ETC/img/ipfs3.png" width="50%"/>

- `콘텐츠 암호화`
  - 다른 사용자가 액세스해야 할 때가지 데이터를 보호한다.
  - Albert가 파일을 만들고 암호로 저장하고 나서 다시 Albert가 액세스해야 할 경우, 비밀번호가 필요하고 없으면 Laika가 볼 수 없다.
<br>

- IPFS는 전송 암호화를 사용하지만 콘텐츠 암호화는 사용하지 않는다.
- 노드 간 데이터를 안전하게 전송할 수 있지만 `CID`만 있으면 누구나 해당 데이터를 다운로드하여 볼 수 있다.
- 특정 암호화를 강제하는 대신 프로젝트에 적합한 방법 선택 가능한 이런 모듈식 설계는 경량화하고 종속성을 없앤다.

## 5. Creating a private network
-  퍼블릭 모니터링으로부터 완전한 보호를 제공하지만 퍼블릭 IPFS 네트워크가 제공하는 확장적 이점이 부족할 수 있다.
-  액세스 권한이 부여된 노드만 액세스할 수 있으며 이러한 노드로만 확장할 수 있다.
<br><br>

# Node
## 종류
### Preload
- `UnixFS DAG`를 공개적으로 사용 가능하게 하려면 무작위로 선택한 `preload` 노드의 HTTP API에서 `ipfs refs -r <CID>`를 호출한다.
  - This puts the CID in the preload nodes' wantlist, which then causes it to fetch the data from the user. 
  - Other nodes requesting the content can then resolve it from `the preload node` using bitswap, as the data is now present in the preload node’s blockstore.

### Relay
- IPFS 노드가 공용 인터넷을 통해 연결할 수 없다고 판단되는 경우 Go-IPFS 노드는 릴레이 노드를 VPN의 일종으로 사용하여 연결할 수 없는 노드에 연결한다.

### Bootstrap
- 부트스트랩 노드를 사용하여 DHT에 처음 들어간다.

- 모든 부트스트랩 노드는 Go-IPFS 구현을 사용.
- Go-IPFS 및 JS-IPFS 노드에서 모두 사용된다.
- Go-IPFS 또는 JS-IPFS 노드가 연결하는 부트스트랩 노드 목록은 구성입니다.

- 부트스트랩 노드의 제한 사항
  - IPFS 노드에 해당 구성에 나열된 부트스트랩 노드가 하나만 있고 부트스트랩 노드가 오프라인 상태가 되면 IPFS 노드가 다시 시작되면 공용 DHT에 액세스할 수 없게 됩니다.
 
### Delegate routing
- IPFS 노드가 단독으로 DHT 로직을 실행할 수 없는 경우 위임 라우팅 노드에 태스크를 위임

<br><br><br>
<출처>
- https://docs.ipfs.io/concepts/privacy-and-encryption/#enhancing-your-privacy
- https://steemit.com/kr/@evasioner/part-5-ipfs
