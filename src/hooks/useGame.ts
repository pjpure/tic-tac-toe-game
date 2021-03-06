import { useEffect, useState } from 'react'
import { useAppSelector } from './useRedux'

function useGame(id: string) {
    const room = useAppSelector(state => state.room)
    const [board, setBoard] = useState(room.board)
    const [status, setStatus] = useState(room.status)
    const [players, setPlayers] = useState(room.players)
    const [isTurn, setIsTurn] = useState(room.players.find(player => player.id === id)?.isTurn)
    const [symbol, setSymbol] = useState(room.players.find(player => player.id === id)?.symbol)
    const [playerStatus, setPlayerStatus] = useState(room.players.find(player => player.id === id)?.status)

    useEffect(() => {
        setBoard(room.board)
        setStatus(room.status)
        setPlayers(room.players)
        setIsTurn(room.players.find(player => player.id === id)?.isTurn)
        setSymbol(room.players.find(player => player.id === id)?.symbol)
        setPlayerStatus(room.players.find(player => player.id === id)?.status)

    }, [room, id])
    return { board, status, players, isTurn, symbol, playerStatus }
}

export default useGame