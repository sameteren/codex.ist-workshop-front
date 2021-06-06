<template>
<div class="app">
  <div class="wrapper">
     <form class="ui segment large form">
        <div class="ui segment">
          <div class="field">
            <div class="one field">
              <div class="field">
              <input type="text" placeholder="long" v-model="lng"/>
              </div>
              <div class="field">
                <input type="text" placeholder="lat" v-model="lat"/>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="two fields">
              <div class="field elem">
               <input type="text" placeholder="radius" v-model="radius"/>
              </div>
              <div class="field">
                <button class="ui button" @click="findCloseBuyButtonPressed(markers)">Find Nearly Places</button>
              </div>
            </div>
          </div>  
        </div>
      </form>

      <div class="table">
        <table style="width:100%">
    <tr>
      <th>Index</th>
      <th>Name</th>
      <th>vicinity</th>
      <th>longitude</th>
      <th>latitude</th>
    </tr>

    <tr v-for="(item, index) in placesList" :key="item.id"> 
      <td>{{index+1}}.</td>
      <td>{{item.name}}</td>
      <td>{{item.vicinity}}</td>
      <td>{{item.longitude}}</td>
      <td>{{item.latitude}}</td>
    </tr>

  </table>
      </div>


</div>


 <div class="six wide column">
  <GmapMap
    :center='center'
    :zoom='12'
    style='width:100%;  height: 400px;'>

  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    @click="center=m.position"/>

  </GmapMap>
</div>
</div>


</template>

<script>
import axios from "axios";
export default {
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 41.0082376, lng: 28.9783589},
      type: "",
      radius: "",
      lat : this.lat,
      lng : this.lng,
      placesList: [],
      markers: []
    }
  },
  methods: {
    findCloseBuyButtonPressed(markers) {
      const URL = 'http://localhost:8070/api/findPlaces/'+this.lat+'/'+this.lng+'/'+this.radius+'';
      axios
        .get(URL)
        .then(response => {
          this.placesList = response.data.placesList; 
          this.placesList.forEach(function(item) {
          
            markers.push({ position:  {
          lat : parseFloat( item.latitude ),
          lng : parseFloat( item.longitude )
      },  });
        
          });
          return this.placesList;
        });
    }
  }
};
</script>

<style scoped>
.wrapper{
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 5px;
}
.table{
  width: 50%;
  max-height: 220px;
  overflow: scroll;  
  border-collapse: collapse;
  width: 100%;
}
.form{
  width: 50%;
}
th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}

th {
  background-color: #04AA6D;
  color: white;
}
</style>
