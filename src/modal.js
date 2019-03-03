import React from 'react';
import PropTypes from 'prop-types';
import './styles/modal.css';
import FormInput from './modalFormInput';

class Popup extends React.Component {
  render () {
    const { data, timeStamp, togglePopup, formsubmittext, onFormSubmission, onDelete} = this.props;
    let parseData = false;
    if(data !== undefined) {
      try {
        parseData = JSON.parse(data)
      } catch {
        return;
      }
    }
    const getIdx = data ? parseData.index : 'false';

    return (
      <div className="modal-container">
        <div className="modal">
          {this.props.timeStamp.getMonth()}
          <button
            className="close"
            onClick={togglePopup}>
            X
          </button>

          <form className="form" idx={getIdx} onSubmit={(e) => onFormSubmission(e)}>
            <FormInput timeStamp={timeStamp} />
            <input
              type="submit"
              value={formsubmittext}/>
            { typeof getIdx === 'number' &&
              <button onClick={() => onDelete(getIdx)}>
                Delete
              </button>
            }
          </form>
        </div>
      </div>
    )
  }
}

Popup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  timeStamp: PropTypes.object.isRequired,
  formsubmittext: PropTypes.string.isRequired,
  onFormSubmission: PropTypes.func.isRequired,
  data: PropTypes.object,
}


export default Popup;
