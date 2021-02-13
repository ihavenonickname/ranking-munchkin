const MATCHES = [
    {
        date: '05/02/2021',
        players: ['Gabriel', 'Vini', 'Pablo do Acre'],
        winner: 'Gabriel'
    },
    {
        date: '05/02/2021',
        players: ['Gabriel', 'Vini', 'Pablo do Acre', 'Patrícia'],
        winner: 'Vini'
    },
    {
        date: '05/02/2021',
        players: ['Gabriel', 'Vini', 'Pablo do Acre'],
        winner: 'Pablo do Acre'
    },
    {
        date: '05/02/2021',
        players: ['Gabriel', 'Vini', 'Pablo do Acre'],
        winner: 'Gabriel'
    },
    {
        date: '13/02/2021',
        players: ['Gabriel', 'Vini', 'Pablo do Acre', 'Patrícia', 'Perneta'],
        winner: 'Gabriel'
    },
    {
        date: '13/02/2021',
        players: ['Gabriel', 'Vini', 'Pablo do Acre', 'Patrícia', 'Perneta'],
        winner: 'Gabriel'
    },
    {
        date: '13/02/2021',
        players: ['Gabriel', 'Pablo do Acre', 'Patrícia', 'Perneta'],
        winner: 'Pablo do Acre'
    },
]

const generateRankingData = matches => {
    const count = (player, pred) => matches.reduce((count, match) => count + +pred(match, player), 0)
    const isWinner = ({ winner }, player) => winner === player
    const isParticipant = ({ players }, player) => players.indexOf(player) !== -1
    const countWins = player => count(player, isWinner)
    const countPlays = player => count(player, isParticipant)
    const buildResume = player => ({ player: player, wins: countWins(player), plays: countPlays(player) })

    const players = [...new Set(matches.map(match => match.players).flat())]
    const ranking = players.reduce((acc, player) => [ ...acc, buildResume(player) ], [])

    return ranking.sort((a, b) => b.wins - a.wins)
}

const generateHistoryData = matches => {
    return matches.reverse().map(match => ({ ...match, players: match.players.length }))
}

const createTableCell = text => {
    const td = document.createElement('td')
    td.textContent = text
    return td
}

const createTableRow = cellTexts => {
    const tr = document.createElement('tr')

    cellTexts.forEach(text => {
        const td = createTableCell(text)
        tr.appendChild(td)
    })

    return tr
}

const fillRankingTable = ranking => {
    const tableBodyRankingPlayers = document.querySelector('#ranking-players > tbody')

    ranking.forEach((resume, i) => {
        const tr = createTableRow([i+1, resume.player, resume.wins, resume.plays])
        tableBodyRankingPlayers.appendChild(tr)
    })
}

const fillHistoryTable = matches => {
    const tableBodyHistory = document.querySelector('#history > tbody')

    matches.forEach(match => {
        const tr = createTableRow([match.date, match.players, match.winner])
        tableBodyHistory.appendChild(tr)
    })
}

const main = () => {
    const ranking = generateRankingData(MATCHES)
    fillRankingTable(ranking)

    const history = generateHistoryData(MATCHES)
    fillHistoryTable(history)
}

window.addEventListener('load', main)
