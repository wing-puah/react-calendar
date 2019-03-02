import React from 'react';
import PropTypes from 'prop-types';
import './styles/modal.css';
import FormInput from './modalFormInput';

class Popup extends React.Component {

  render () {
    const {data, defaultDate, togglePopup} = this.props;

    return (
          <div
          className={`modal-container`}>
            <div className="modal">

              <button
                className="close"
                onClick={togglePopup}>
                X
              </button>

              <form className="form">
                <FormInput
                  data={data}
                  startdate={defaultDate} />
                <input type="submit" />
                  <button >
                    Delete
                  </button>)
              </form>
            </div>
          </div>
        )
    // const { appear, close, selectedTime, data,
    //   submitInstructions, onSubmission, onDelete } = this.props;
    // let parseData = false;
    // if(data !== undefined) {
    //   parseData = JSON.parse(data)
    // }
    // const defaultDate = new Date(selectedTime.getTime() - (selectedTime.getTimezoneOffset() * 60000 ))
    //                     .toISOString()
    //                     .split("T")[0];
    //
    // const getIdx = data ? parseData.index : 'false';

//     return (
//       <div
//       className={`modal-container ${appear}`}>
//         <div className="modal">
//
//           <button
//             className="close"
//             onClick={close}>
//             X
//           </button>
//
//           <form className="form" idx={getIdx} onSubmit={(e) => onSubmission(e)}>
//             <FormInput
//               data={data}
//               startdate={defaultDate} />
//             <input type="submit" value={submitInstructions}/>
//             {onDelete && (
//               <button onClick={() => onDelete(getIdx)}>
//                 Delete
//               </button>)}
//           </form>
//         </div>
//       </div>
//     )
  }
}

Popup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
}


export default Popup;
