import { useState, useRef } from 'react'
import Card from './Card'

export default function Cards() {
    const [cards, setCards] = useState([
        { id: 0, name: 'Bryan Cranston', status: '', img: '/images/1.png' },
        { id: 0, name: 'Bryan Cranston', status: '', img: '/images/1C.png' },
        { id: 1, name: 'Bryan Cranston', status: '', img: '/images/2.png' },
        { id: 1, name: 'Bryan Cranston', status: '', img: '/images/2C.png' },
        { id: 2, name: 'Bryan Cranston', status: '', img: '/images/3.png' },
        { id: 2, name: 'Bryan Cranston', status: '', img: '/images/3C.png' },
        { id: 3, name: 'Bryan Cranston', status: '', img: '/images/4.png' },
        { id: 3, name: 'Bryan Cranston', status: '', img: '/images/4C.png' },
        { id: 4, name: 'Bryan Cranston', status: '', img: '/images/5.png' },
        { id: 4, name: 'Bryan Cranston', status: '', img: '/images/5C.png' },
        { id: 5, name: 'Bryan Cranston', status: '', img: '/images/6.png' },
        { id: 5, name: 'Bryan Cranston', status: '', img: '/images/6C.png' },
        { id: 6, name: 'Bryan Cranston', status: '', img: '/images/7.png' },
        { id: 6, name: 'Bryan Cranston', status: '', img: '/images/7C.png' },
        { id: 7, name: 'Bryan Cranston', status: '', img: '/images/8.png' },
        { id: 7, name: 'Bryan Cranston', status: '', img: '/images/8C.png' },
        { id: 8, name: 'Bryan Cranston', status: '', img: '/images/9.png' },
        { id: 8, name: 'Bryan Cranston', status: '', img: '/images/9C.png' },
        { id: 9, name: 'Bryan Cranston', status: '', img: '/images/10.png' },
        { id: 9, name: 'Bryan Cranston', status: '', img: '/images/10C.png' },
        { id: 10, name: 'Bryan Cranston', status: '', img: '/images/11.png' },
        { id: 10, name: 'Bryan Cranston', status: '', img: '/images/11C.png' },
        { id: 11, name: 'Bryan Cranston', status: '', img: '/images/12.png' },
        { id: 11, name: 'Bryan Cranston', status: '', img: '/images/12C.png' },
    ].sort(() => Math.random() - .5))

    const [previousCardState, setPreviousCardState] = useState(-1)
    const previousIndex = useRef(-1)

    const matchCheck = (currentCard) => {
        if (cards[currentCard].id === cards[previousCardState].id) {
            cards[previousCardState].status = 'active matched'
            cards[currentCard].status = 'active matched'
            setPreviousCardState(-1)
        } else {
            cards[currentCard].status = 'active'
            setCards([...cards])
            setTimeout(() => {
                setPreviousCardState(-1)
                cards[currentCard].status = 'unmatch'
                cards[previousCardState].status = 'unmatch'
                setCards([...cards])
            }, 1000);
        }
    }

    const clickhandler = (index) => {

        if (index !== previousIndex.current) {
            if (cards[index].status === 'active matched') {
                alert('already matched')
            } else {
                if (previousCardState === -1) {
                    previousIndex.current = index
                    cards[index].status = 'active'
                    setCards([...cards])
                    setPreviousCardState(index)
                } else {
                    matchCheck(index)
                    previousIndex.current = -1
                }
            }
        } else {
            alert('card currently seleted')
        }

    }

    return (
        <div className="container">
            {cards.map((card, index) => {
                return <Card key={index} card={card} index={index} clickhandler={clickhandler} />
            })}
        </div>
    );
}