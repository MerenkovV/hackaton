import React, { useState } from 'react'
import loader from '../../img/gears-spinner.svg'
import { add, get } from '../../api/guideAPI'
import './GuideCreator.css'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/RootStore'

const GuideCreator = observer(({name, endpoint, integrated}) => {
    const [payload, setPayload] = useState({
        name: '',
        about: ''
    })
    const [loading, setLoading] = useState(false)
    const {guide} = useStore()

    const createGuide = () => {
        setLoading(true)
        add(payload.name, payload.about, endpoint).then( async ()=>{
            setPayload({
                name: '',
                about: ''
            })
            if(integrated){
                await get().then((data)=>{
                    guide.setGuide(data)
                })
            }
            
            alert("Успешно создано")
        })
            .catch(e=>console.log(e))
            .finally(()=>setLoading(false))
    }

  return (
    <div className='guide' style={integrated && {margin: '6px 0px'}}>
        <h2 className='guide-header'>{name}</h2>
        <div className='guide-input-wrapper'>
            <label className='guide-label'>Название</label>
            <input className='guide-input' type="text" value={payload.name} onChange={e=>{setPayload({...payload, name: e.target.value})}}/>
        </div>
        <div className='guide-input-wrapper'>
            <label className='guide-label'>Описание</label>
            <textarea className='guide-textarea' type="text" value={payload.about} onChange={e=>{setPayload({...payload, about: e.target.value})}}></textarea>
        </div>
        <div className='guide-input-wrapper'>
        {
            loading ? <img src={loader} alt="" width='30px'/> :
                <button className='guide-button' onClick={createGuide}>Создать</button>
        }
        </div>
    </div>
  )
})

export default GuideCreator