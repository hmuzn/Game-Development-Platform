# Game Development Team

## 탑재 기능
1. 캐릭터 토큰화 시스템
2. 아이템 생성 및 거래 시스템
3. 마켓플레이스
4. 커뮤니티 주도형 플러그인

## Main Page
> HTML, CSS, JS를 활용한 웹 구조물
> 본인 제작 중 프로젝트 (aka 마이페이지), 마켓플레이스 등 핵심 기능에 빠르게 접근할 수 있도록 설계
> 잘 보이는 곳 (화면 중앙 등)에 "Get Started"와 같은 안내 페이지로 연결되는 링크, 홍보 이미지 등을 걸어두어 처음 서비스를 이용하는 사람들도 쉽게 이용할 수 있도록 함.
> > 기능 사용은 상단바, 혹은 사이드바를 이용해 사용 유도

## 캐릭터 토큰화 시스템
> 캐릭터 토큰화 시스템은 XRPL의 NFT 기능을 활용하여 캐릭터를 디지털 자산으로 변환하는 작업임.
> > XRPL의 NFTokenMint 트랜잭션을 사용하여 캐릭터 정보를 포함한 NFT를 발행할 수 있다.

### 의사코드
```
const characterData = {
    "characterName": "Warrior",
    "attributes": {
        "level": 5,
        "strength": 10,
        "defense": 8
    }
} // JSON 형식으로 캐릭터를 정의

const URI = xrpl.convertStringToHex(JSON.stringify(characterData)); // 정의된 캐릭터 데이터를 HEX로 변환
```

이후 NFTokenMint 트랜젝션을 사용해 NFT로 발행
먼저 XRPL 지갑 생성을 해야 함.

```
const xrpl = require("xrpl");

async function mintCharacterNFT() {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net/");
    await client.connect();

    const wallet = xrpl.Wallet.fromSeed("YOUR_TESTNET_WALLET_SECRET");

    const characterData = {
        characterName: "Warrior",
        attributes: {
            level: 5,
            strength: 10,
            defense: 8
        }
    };

    const URI = xrpl.convertStringToHex(JSON.stringify(characterData));

    const nftMintTx = {
        TransactionType: "NFTokenMint",
        Account: wallet.address,
        URI: URI, // JSON 데이터를 HEX로 변환
        Flags: 8, // 전송 가능 NFT
        NFTokenTaxon: 0 // 카테고리 ID, 자유롭게 설정
    };

    try {
        const response = await client.submitAndWait(nftMintTx, { wallet });
        console.log("NFT minted successfully:", response.result);
    } catch (error) {
        console.error("Error minting NFT:", error);
    } finally {
        client.disconnect();
    }
}

mintCharacterNFT();
```

## 아이템 생성 및 거래 시스템
> 아이템 생성 및 거래 시스템은 게임 플레이 시 필요한 그 어떤 아이템을 생성하고, 사용자 간 거래를 할 수 있게 함으로써 사용자로 하여금 컨텐츠를 제공하는 시스템 중 하나가 될 수 있다.
> 해당 시스템이 없을 경우 아이템의 생성 및 거래가 불가능하여 게임의 재미가 반감되므로, 제작에 반드시 필요한 시스템임.

### 의사코드
```
아이템거래() {
	let pInfo = getPlayerInfo() // 플레이어의 데이터를 상위 코드 혹은 데이터베이스에서 받아옴
	let playerId = [0, 0] // 거래를 원하는 플레이어들의 고유 ID를 저장
	let item = 0 // 거래하고자 하는 아이템의 코드 (종류)
	let cost = 0 // 거래하고자 하는 아이템의 가격
	let count = 0 // 거래하고자 하는 아이템의 개수

	let balance = getUserBalance(playerId[0]) // 사용자의 현재 자산을 불러오는 함수 실행, 변수에 저장
	if (balance < cost) return 0; // 만약 사용자의 자산이 아이템의 가격보다 적으면 비정상적인 접근으로 여기고 함수 강제 종료
	else { // 올바른 접근일 경우 거래 시스템 시작
		var newBalance = [0, 0] // 잔액 조정을 위해 2개의 변수가 들어 있는 배열을 선언, 값은 0으로 초기화
		newBalance[0] = parseInt(pInfo[playerId[0]]["balance"]) - cost // 구매자의 기존 잔액에서 물품의 금액만큼 제거
		newBalance[1] = parseInt(pInfo[playerId[1]]["balance"]) + cost // 판매자의 기존 잔액에서 물품의 금액만큼 추가

		var newItem [0, 0] // 물품 개수 조정을 위해 2개의 변수가 들어있는 배열을 선언, 값은 0으로 초기화
		newItem[0] = parseInt(pInfo[playerId[0]]["item"][item]) + count // 구매자의 기존 해당 아이템 개수를 가져와, 구매한 개수만큼 추가
		newItem[1] = parseInt(pInfo[playerId[1]]["item"][item]) - count // 판매자의 기존 해당 아이템 개수를 가져와, 판매한 개수만큼 제거

		updateDataBase(playerId, "balance", newBalance, "item", item, newItem) // 함수를 통해 데이터베이스에 변경사항을 적용 (함수의 형태는 변경해야 할 듯)
	}
}

아이템생성() {
	let requestedItem = 0 // 생성을 요청 받은 아이템의 코드를 저장, 매개변수를 통해 받아오거나 따로 받아오는 함수 필요해보임
	let count = 0 // 생성 요청 받은 아이템의 개수 저장
	let cost = 0 // (필요 시) 생성을 위해 필요한 재화의 수 저장

	let isItemValid = Boolean(0) // 아이템의 유효성을 검증하기 위해 불리언 변수 생성, 초기값은 false
	if (requestedItem >= 0 && requestedItem <= ??) isItemValid = true // 아이템이 유효한 아이템인지 검사, 0부터 ??까지 아이템 코드가 쭉 나열되어 있다는 가정 하에 작성. 실제 코드에서는 아이템 코드의 현황에 맞춰 ??의 값을 수정 요함
	if (!isItemValid) return 0; // 유효하지 않은 아이템 생성 요청 시 요청 거부 (함수 종료)
	else {
		// 아이템 생성 행동 구현
	}
}
```

## 마켓플레이스

## 커뮤니티 플러그인
