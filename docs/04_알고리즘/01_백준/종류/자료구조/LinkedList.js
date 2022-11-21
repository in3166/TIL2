function LinkedList(params) {
    var Node = function (element) {
        this.element = element; // 원소
        this.next = null;   // 다음 노드 포인터
    }

    var length = 0; // LinkedList 내부 프라이빗 프로퍼티 - 연결리스트에 담긴 원소 개수
    var head = null; // 연결이 시작되는 지점

    // 리스트 맨끝에 원소추가
    this.append = function (element) {
        var node = new Node(element),
            current;
        if (head === null) {
            head = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node; // 마지막에 넣기
        }
        length++;
    }
    //해당 위치에 원소 추가
    this.insert = function (position, element) {

    }
    // 해당위치 원소 삭제
    this.removeAt = function (position) {
        if (position > -1 && position < length) {
            var current = head, previous, index = 0;
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else { // 범위 벗어남
            return null;
        }
    }
    //원소 값 기준 삭제
    this.remove = function (element) {

    }
    //해당 원소 인덱스 반환
    this.indexOf = function (element) {

    }
    this.isEmpty = function () {

    }
    this.size = function () {

    }
    this.toString = function () {

    }
    this.print = function () {

    }


}

var Node = function (element) {
    this.element = element; // 원소
    this.next = null;   // 다음 노드 포인터
}

var node = new Node("123"), current;
console.log(node)
console.log(current)