const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

const animals = [
    {type: `turtle`, icon: `🐢`},
    {type: `octopus`, icon: `🐙`},
    {type: `fish`, icon: `🐠`},
    {type: `flamingo`, icon: `🦩`},
    {type: `penguin`, icon: `🐧`}
]

const getRandomInt = (max, min=0) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class List extends React.Component{
    constructor(props){
        super(props);

        if(this.props) this.state = {}

        if(this.props.list){
            this.state.list = JSON.parse(JSON.stringify(this.props.list));
            this.state.selectedItems = [];
            this.state.nonSelectedItems = this.state.list.map((item, index) => index);
            this.state.border = undefined;

            const fillTr = setInterval(()=>{
                let randomIndex = getRandomInt(this.state.nonSelectedItems.length),
                    randomElementByIndex = this.state.nonSelectedItems[randomIndex];
                
                this.state.nonSelectedItems.splice(randomIndex,1);
                this.state.selectedItems.push(randomElementByIndex);

                console.log(this.state.nonSelectedItems, this.state.selectedItems);

                if(this.state.selectedItems.length === Math.ceil(this.state.list.length/2)){
                    this.state.border = `10px`;
                }

                if(!this.state.nonSelectedItems.length){
                    clearInterval(fillTr);
                    this.state.border = `20px`;
                }

                this.setState({});
    
            }, 2000);
        }
    }

    render(){
        if(this.state.list){
            return <table style={{borderWidth: this.state.border}}>
                <tbody>
                    {
                        this.state.list.map((item,index) => <tr 
                            className={this.state.selectedItems.indexOf(index)!==-1 ? `active` : undefined}
                            key={`tr_`+index}
                        >
                            {Object.keys(item).map(key => <td key={`td_`+key}>{item[key]}</td>)}
                        </tr>)
                    }
                </tbody>
            </table>
        }
    }
}

root.render(<div>
    <List list={animals} />
    <List />
</div>);