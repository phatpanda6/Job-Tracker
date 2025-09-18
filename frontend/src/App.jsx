import PageWrapper from "./components/PageWrapper.jsx";
import Header from "./components/Header.jsx";
import JobFilter from "./components/JobFilters.jsx";
import JobCard from "./components/JobCard.jsx";

function App() {
  return (
    <main className="bg-slate-100 min-h-screen">
      <PageWrapper>
        <Header />
        <JobFilter/>
        <JobCard/>
      </PageWrapper>
    </main>
  );
}

export default App;
