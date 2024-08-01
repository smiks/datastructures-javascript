/*
Doubly Linked List

DLL has the following methods

- isEmpty() : returns true if DLL is empty, otherwise false
- count() : returns number of elements in the list
- append(value) : appends value to the end of the list
- prepend(value) : prepends value to the start of the list
- pop() : returns last value of the list and removes it from the list
- popLeft() : return first value of the list and removes it from the list
- peekFirst() : returns first value of the list
- peekLast() : returns last value of the list
- iterate() : generator yielding values from head to tail
- iterateBack() : generator yielding values from tail to head
- find(lookFor) : checks if lookFor value is in the list
*/

class DLL_Node {
    constructor(value) {
        this.value = value
        this.previous = null
        this.next = null
    }
}

class DLL {
    constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }

    isEmpty() {
        return this.size === 0
    }

    append(value) {
        const temp = new DLL_Node(value)

        if(this.isEmpty()){
            this.head = temp
            this.tail = temp
            this.size += 1
            return
        }

        temp.previous = this.tail
        this.tail.next = temp
        this.tail = this.tail.next
        this.size += 1
    }

    prepend(value) {
        const temp = new DLL_Node(value)

        if(this.isEmpty()){
            this.head = temp
            this.tail = temp
            this.size += 1
            return
        }

        temp.next = this.head
        this.head.previous = temp
        this.head = this.head.previous
        this.size += 1
    }

    count() {
        return this.size
    }

    * iterate() {
        if(this.isEmpty()){
            return
        }
        let current = this.head
        while(current !== null){
            yield current.value
            current = current.next
        }
    }

    * iterateBack() {
        if(this.isEmpty()){
            return
        }
        let current = this.tail
        while(current !== null){
            yield current.value
            current = current.previous
        }        
    }

    pop() {
        if(this.isEmpty()){
            return false
        }

        if(this.size == 1){
            const temp = this.head
            this.head = null
            this.size -= 1
            return temp.value
        }

        const temp = this.tail
        this.tail = this.tail.previous
        this.tail.next = null
        this.size -= 1
        return temp.value
    }

    popLeft() {
        if(this.isEmpty()){
            return false
        }
        if(this.size == 1){
            const temp = this.head
            this.head = null
            this.size -= 1
            return temp.value
        }        
        const temp = this.head
        this.head = this.head.next
        this.head.previous = null
        this.size -= 1
        return temp.value
    }

    peekFirst() {
        if(this.isEmpty()){
            return false
        }
        return this.head.value
    }

    peekLast() {
        if(this.isEmpty()){
            return false
        }
        return this.tail.value
    }

    find(lookFor) {
        if(this.isEmpty()){
            return false
        }

        let current = this.head
        while(current !== null){
            if(current.value == lookFor){
                return true
            }
            current = current.next
        }
        return false
    }
}

function tests() {

    function assertEqual(a, b){
        if(a == b){
            console.log('%c PASS ', 'background: #222; color: #00AA00');
        } else {
            console.log('%c FAIL ', 'background: #222; color: #AA0000');
        }
    }
    const dl = new DLL()

    dl.append(3)
    assertEqual(3, dl.peekLast())
    assertEqual(3, dl.peekFirst())
    dl.append(4)
    dl.append(5)
    dl.append(6)

    assertEqual(4, dl.count())

    assertEqual(3, dl.peekFirst())
    assertEqual(6, dl.peekLast())

    dl.prepend(2)
    dl.prepend(1)

    assertEqual(true, dl.find(5))
    assertEqual(false, dl.find(7))

    assertEqual(1, dl.peekFirst())
    assertEqual(6, dl.count())

    let s = ''
    for(const val of dl.iterate()){
        s += `${val}`
    }

    assertEqual('123456', s)

    s = ''
    for(const val of dl.iterateBack()){
        s += `${val}`
    }

    assertEqual('654321', s)

    assertEqual(6, dl.pop())
    assertEqual(1, dl.popLeft())
    assertEqual(4, dl.count())
    assertEqual(5, dl.peekLast())
    assertEqual(2, dl.peekFirst())

    s = ''
    for(const val of dl.iterate()){
        s += `${val}`
    }

    assertEqual('2345', s)

    s = ''
    for(const val of dl.iterateBack()){
        s += `${val}`
    }

    assertEqual('5432', s)

    
    assertEqual(false, dl.find(6))

    dl.pop()
    dl.pop()
    dl.pop()
    dl.pop()
    assertEqual(0, dl.count())

    assertEqual(false, dl.pop())
    assertEqual(false, dl.popLeft())
    assertEqual(false, dl.peekFirst())
    assertEqual(false, dl.peekLast())

}

if(require.main === module){
    tests()
}