import { useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector ,useDispatch } from "react-redux"
import { getTicket, reset } from "../features/tickets/ticketSlice"
import { useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import moment from 'moment';

function Ticket() {
  const {ticket, isLoading , isSuccess, isError, message} = useSelector((state) => state.tickets)

  const params = useParams()
  const dispatch = useDispatch()
  const {ticketId} = useParams()

  useEffect(() =>{
    if(isError){
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  },[isError, message, ticketId])

  if(isLoading){
    return <Spinner />
  }

  if(isError){
    return <h3>Something Went Worng</h3>
  }
  const formattedDate = moment(ticket.createAt).format('YYYY-MM-DD HH:mm:ss');

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {moment(ticket.createAt).format('YYYY-MM-DD HH:mm:ss')}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  )
}

export default Ticket
