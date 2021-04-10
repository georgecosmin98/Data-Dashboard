import React, { Component } from 'react';
import AuthenticationService from '../api/AuthenticationService'
import GoogleHeatMapComponent from './GoogleHeatMapComponent';
import LineChartComponent from './Charts/LineChartComponent';
import BarChartComponent from './Charts/BarChartComponent';
import UserLocationService from '../api/UserLocationService';
import UserService from '../api/UserService';
import AirQualityService from '../api/AirQualityService';
import UtilityService from '../api/UtilityService';

class DashboardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pm25Data: [1, 1],
            address: '',
            measurement: '',
            pollutantName: ''
        }
        this.retrieveHomePollutionData = this.retrieveHomePollutionData.bind(this);
    }

    async componentDidMount() {
       await UserService.retrieveUserGeneralInfo().then(response => {
            console.log(response.data)
            this.setState({ address: response.data.address })
        })
        this.retrieveHomePollutionData(0,0, this.state.address);
    }

   async retrieveHomePollutionData(date, sensor, address) {
        var latitude,longitude;
    
        await UtilityService.addressToCoordinates(address).then(response => {
            console.log(response.data.features[0].place_name)
            latitude=response.data.features[0].center[1];
            longitude=response.data.features[0].center[0];
        })
        console.log(latitude)
        console.log(longitude)
        AirQualityService.retrieveHomePollutionValues(date, sensor, latitude, longitude).then(response => {
            console.log(response)
            var data = []
            this.setState({measurement: response.data[0].measurement})
            this.setState({pollutantName: response.data[0].sensor})

            for (var i = 0; i < response.data.length; i++) {
                data.push([Date.parse(response.data[i].timestamp), response.data[i].value])
            }
            this.setState({ pm25Data: data })

        })
    }

    render() {
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <div className="dashboard">
                {!isLoggedIn && <h1>Lorem ipsum dolor sit amet.</h1>}
                {!isLoggedIn && <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa qui dolor ullam soluta quod, laborum repellat recusandae magni voluptatem quisquam, id esse cupiditate odio sapiente distinctio fugiat a. Facilis officiis repellendus magnam eum in a cum. Ex at iure porro, facere sit eveniet, ipsam architecto necessitatibus deleniti laborum, aut ipsa eos dolores cum minus delectus nemo veritatis? Laborum a blanditiis, neque corrupti vel consequatur ducimus ad at. Doloremque maiores sequi illum odio iste eius necessitatibus illo vel placeat qui voluptate aliquam ut reprehenderit libero quae consequatur, aliquid omnis ea magnam dicta neque, distinctio dolore! Quod expedita eos saepe veritatis doloribus ipsa! Eum, dicta quidem. Earum quaerat, quas debitis mollitia ducimus eum ullam! Corrupti, quasi. Excepturi mollitia perspiciatis nesciunt facere odio dicta at saepe voluptate error incidunt eaque, iusto officiis vero sapiente. Reprehenderit quae possimus provident blanditiis voluptatem sit molestiae, vitae iure beatae adipisci ut voluptas esse aliquid distinctio molestias magnam maxime praesentium unde et! Quaerat tempora inventore, non a autem quos aspernatur quas neque reiciendis omnis quasi qui magni aliquam quia aut architecto. Maiores vel, modi quibusdam cum dolor esse aliquid, blanditiis laudantium nobis hic alias adipisci illum reprehenderit animi nihil molestias. Voluptatum itaque sequi, corrupti molestiae iure eum possimus!</p>}
                {!isLoggedIn && <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque alias, earum quam consequuntur unde veniam modi quibusdam perferendis? Quas, enim eaque quibusdam debitis eius sint ducimus id, iusto sit voluptatum quae officiis corporis quis vitae sunt! Nam ut cupiditate, vero dolore maiores voluptas laboriosam consequatur explicabo atque laudantium, illo sed.</p>}
                {!isLoggedIn && <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa qui dolor ullam soluta quod, laborum repellat recusandae magni voluptatem quisquam, id esse cupiditate odio sapiente distinctio fugiat a. Facilis officiis repellendus magnam eum in a cum. Ex at iure porro, facere sit eveniet, ipsam architecto necessitatibus deleniti laborum, aut ipsa eos dolores cum minus delectus nemo veritatis? Laborum a blanditiis, neque corrupti vel consequatur ducimus ad at. Doloremque maiores sequi illum odio iste eius necessitatibus illo vel placeat qui voluptate aliquam ut reprehenderit libero quae consequatur, aliquid omnis ea magnam dicta neque, distinctio dolore! Quod expedita eos saepe veritatis doloribus ipsa! Eum, dicta quidem. Earum quaerat, quas debitis mollitia ducimus eum ullam! Corrupti, quasi. Excepturi mollitia perspiciatis nesciunt facere odio dicta at saepe voluptate error incidunt eaque, iusto officiis vero sapiente. Reprehenderit quae possimus provident blanditiis voluptatem sit molestiae, vitae iure beatae adipisci ut voluptas esse aliquid distinctio molestias magnam maxime praesentium unde et! Quaerat tempora inventore, non a autem quos aspernatur quas neque reiciendis omnis quasi qui magni aliquam quia aut architecto. Maiores vel, modi quibusdam cum dolor esse aliquid, blanditiis laudantium nobis hic alias adipisci illum reprehenderit animi nihil molestias. Voluptatum itaque sequi, corrupti molestiae iure eum possimus!</p>}
                {!isLoggedIn && <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque alias, earum quam consequuntur unde veniam modi quibusdam perferendis? Quas, enim eaque quibusdam debitis eius sint ducimus id, iusto sit voluptatum quae officiis corporis quis vitae sunt! Nam ut cupiditate, vero dolore maiores voluptas laboriosam consequatur explicabo atque laudantium, illo sed.</p>}
                {/* {isLoggedIn && <GoogleHeatMapComponent></GoogleHeatMapComponent>} */}
                {isLoggedIn && <h1>Pollution Data for {this.state.address}</h1>}
                <div class="flex-break"></div>
                {isLoggedIn && <LineChartComponent data={this.state.pm25Data}></LineChartComponent>}
                <div class="flex-break"></div>
                {isLoggedIn && <BarChartComponent data={this.state.pm25Data} measurement={this.state.measurement} pollutantName = {this.state.pollutantName}></BarChartComponent>}
             </div>
        )
    }
}
export default DashboardComponent;