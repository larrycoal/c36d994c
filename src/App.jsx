import React, { useState, useCallback, useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Card from './components/card.jsx';
import Loader from './components/loader.jsx';
import { Archived_Page, Missed_Page, Recent_Page, Voicemail_Page } from './constant.js';


const App = () => {
  const [allCalls, setAllCalls] = useState()
  const [loading, setLoading] = useState()
  const [page, setPage] = useState('recent')
  const Base_Url = "https://aircall-backend.onrender.com/activities"

  const getAllCalls = useCallback(async () => {
    try {
      setLoading(true)
      const resp = await fetch(Base_Url).then((res) => res.json())
      if (resp) {
        setLoading(false)
        setAllCalls(resp)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [])
  useEffect(() => {
    getAllCalls()
  }, [])

  const handleArchiveAndUnarchiveCall = async (id, archived) => {
    try {
      const resp = await fetch(Base_Url + `/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: !archived }),
      }).then((res) => {
        return res
      })

      if (resp) {
        getAllCalls()
      }
    } catch (error) {
      console.log(error)

    }
  }
  const displayCalls = (calls) => {
    return calls?.length > 0 ?
      calls.map((call) => <Card key={call.id} callDetails={call} archiveCall={handleArchiveAndUnarchiveCall} />)
      : <div className='empty-log'>
        {page === Recent_Page ? <p>Your call log is empty</p> :
          page === Archived_Page ? <p>Archive is empty</p> :
            page === Missed_Page ? <p>No missed calls</p> :
              page === Voicemail_Page ? <p>No Voicemail</p> : null
        }
      </div>

  }
  const handleArchiveAndUnArchiveCalls = () => {
    const calls = allCalls.filter((call) => page === Recent_Page ? !call.is_archived : call.is_archived)
    const resp = calls.map(async (call) => { handleArchiveAndUnarchiveCall(call.id, call.is_archived) })
    Promise.all(resp)
  }

  return (
    <div className='container'>
      <Header handleArchiveAndUnArchiveCalls={handleArchiveAndUnArchiveCalls} page={page} changePage={setPage} />
      <div className="container-view">
        {
          loading && <Loader />
        }
        {
          page === Recent_Page ? displayCalls(allCalls?.filter(call => !call.is_archived)) :
            page === Archived_Page ? displayCalls(allCalls?.filter(call => call.is_archived)) :
              page === Missed_Page ? displayCalls(allCalls?.filter(call => call.call_type === "missed")) :
                page === Voicemail_Page ? displayCalls(allCalls?.filter(call => call.call_type === "voicemail")) :
                  <div>Call log is empty</div>
        }
      </div>
      <Footer archiveCount={allCalls?.filter((call) => call.is_archived)} changePage={setPage} page={page} />
    </div>
  );
};

export default App;
