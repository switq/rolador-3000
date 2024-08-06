import { useState } from "react";


function App() {

  const [listString, setListString] = useState('');
  const [itensSortidos, setItensSortidos] = useState([]);

  const changeList = (e) => {
    const value = e.target.value;
    setListString(value);
  }

  const itemListConverter = (itemList) => {
    const namePattern = /(.*?)\s*\[/;
    const rangePattern = /\[(.*?)\].*:/;
    const descPattern = /:\s*(.*)/;

    const list = itemList.split('->')

    const lista = list.map((item) => {
      const nameString = item.match(namePattern);
      const rangeString = item.match(rangePattern);
      const descString = item.match(descPattern);

      if (!(nameString && rangeString && descString)) return;

      const name = nameString[1].trim();
      const range = parseFloat(rangeString[1].trim());
      const desc = descString[1].trim();

      if (isNaN(range)) return



      const objItem = { name, range, desc };

      return objItem;
    }).filter((item) => item)

    return lista;
  }

  const randomNumber = (end = 100) => {
    return Math.floor(Math.random() * end) + 1;
  }

  const sortear = () => {
    const itemList = itemListConverter(listString);
    const maxNumber = itemList.reduce((acc, {range}) => {
      if (acc <= range) return range;
      return acc;
    }, 0);
    const sortedValue = randomNumber(maxNumber);
    const sortedItem = itemList.find(({ range }) => {
      return sortedValue <= range;
    })

    if (!sortedItem) return
    const newItens = [...itensSortidos];
    newItens.push(sortedItem)
    setItensSortidos(newItens);
  }

  const limpar = () => setItensSortidos([])

  return (
    <div>
      <h1>ROLADOR 3000</h1>
      <button onClick={sortear}>SORTEAR</button>
      <button onClick={limpar}>LIMPAR</button>
      <div style={{ display: 'flex' }}>
        <textarea style={{ backgroundColor: '#ddd', width: '400px', height: '600px' }} value={listString} onChange={changeList} />
        <ItemList itensSortidos={itensSortidos} />
      </div>
    </div>
  );
}

export default App;

function ItemList({ itensSortidos }) {
  return (<ul>
    {itensSortidos.map(({
      name,
      desc
    }, index) => {
      return <li key={name + index}>
        <span style={{
          fontWeight: '600px'
        }}>{name}</span>: {desc}
      </li>;
    })}
  </ul>);
}
