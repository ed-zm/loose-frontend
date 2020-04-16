import React from 'react'
import Modal from 'react-modal'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

class PhotoCropperModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      zoom: 0,
      rotate: 0,
      src: props.src
    }
  }

//   componentWillReceiveProps (nextProps) {
//     this.setState({
//       src: nextProps.src,
//       zoom: 1
//     })
//   }

  handleSave = () => {
    const { savePicture, fileType } = this.props
    const canvas = this.cropper.getCroppedCanvas()

    if (typeof canvas === 'undefined') {
      return
    }
    canvas.toBlob(blob => savePicture(blob), fileType)
  }

  handleZoom = (e) => {
    this.setState({ zoom: e.target.value })
  }

  rotateLeft = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

//   handleImageChange = (f) => {
//     const file = f && f[0]

//     validatePicture(file, () => {
//       this.setState({
//         src: file
//       })
//     })
//   }

  render () {
    const { closeCropper } = this.props
    const { zoom, rotate, src } = this.state
    return (
      <Modal
        isOpen={!!src}
        onRequestClose={closeCropper}
        style={{overlay: {display:'flex', alignItems: 'center', background: 'rgba(0,0,0, 0.3)'},content: { position: 'none', margin: 'auto', maxWidth: '800px', maxHeight: '600px', padding: 0, background: 'none', border: 'none'}}}
        ariaHideApp={false}
      >
        <div>
          {src &&
            <Cropper
              style={{ width: '640px', height: '480px'}}
              aspectRatio={1}
              minCropBoxWidth={100}
              dragMode='move'
              guides={true}
              autoCropArea={1}
              scaleX={zoom}
              scaleY={zoom}
              rotateTo={rotate}
              ref={r => { this.cropper = r }}
              zoomable={false}
              src={src}
            />
          }
      </div>
      <div>
        {/*<Slider onChange = {this.handleZoom} value = {this.state.zoom} min = {1} max = {2} style = {{background: '#000'}}/>*/}
          <button onClick = {this.handleSave}>
            Save
          </button>
          
          <button onClick = {closeCropper}>
            Cancel
          </button>
      </div>
      </Modal>
    )
  }
}

export default PhotoCropperModal