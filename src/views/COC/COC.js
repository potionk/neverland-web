import React, {Component} from 'react';
import axios from "axios";

class COC extends Component {
    state = {
        data: null
    }

    onClick = async () => {
        axios.post("http://localhost:3001/coc/get_clan_info", {
            id: "%232Y2Y9YCUU"
        })
            .then(res => {
                let data = res.data;
                console.log(data);
            }).catch(error => {
            console.log('failed', error)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.onClick}>불러오기</button>
                </div>
                {this.state.data && <textarea rows={7} value={JSON.stringify(this.state.data, null, 2)}/>}
            </div>

        );
    }
}

export default COC;