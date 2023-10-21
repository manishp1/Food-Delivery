import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchResult from "./components/serach-resutls/SearchResult";
export const BASE_URL = "http://localhost:9000";
function App() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(null);
  const [fitlerByButton, setFilterByButton] = useState("all");

  const filterdButton = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "BreakFast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setData(data);
      setFilter(data);
      console.log(data);
    } catch (error) {}
  };

  const filterButton = (type) => {
    if (type === "all") {
      setFilter(data);
      setFilterByButton("all");
      return;
    }
    const checkFilter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilter(checkFilter);
    setFilterByButton(type);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFilter = (e) => {
    const getData = e.target.value;
    if (getData === "") {
      setFilter(null);
    }
    const checkFilter = data?.filter((food) =>
      food.name.toLowerCase().includes(getData.toLowerCase())
    );
    setFilter(checkFilter);
  };

  
  return (
    <>
      <Container>
        <TopContainter>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input onChange={getFilter} placeholder="search food..." />
          </div>
        </TopContainter>
        <FilterContainer>
          {filterdButton.map((values) => (
            <Button key={values.name} onClick={() => filterButton(values.type)}>
              {values.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filter} />
    </>
  );
}

export default App;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;
const TopContainter = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 40px;
  align-item: center;

  .search {
    input {
      border: 1px solid red;
      background-color: transparent;
      padding: 10px;
      border-radius: 5px;
      font-size: 20px;
      color: white;
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height:140px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding-bottom: 40px;
`;
export const Button = styled.button`
  border-radius: 5px;
  background: #ff4343;
  padding: 6px 12px;
  color: white;
  font-size: 16px;
  font-weight: 400;
  border-none;
  &:hover {
    background-color:#8b0000
    ;
  }
`;
