import Spike from "./spike.js";

export default class SpikeController{
    constructor(){
        this.spikes = [];
        this.numSpikesAllowed = 1;
        this.timeUntilNextSpike = 0;
    }

    shoot(xPos, yPos, vel) {
        if(this.timeUntilNextSpike <= 0){ //causes delay between spikes. (This prevents it from shooting two immediately when holding down space)
            if(this.spikes.length < this.numSpikesAllowed){ //limits the number of spikes
                this.spikes.push(new Spike(xPos, yPos, vel));
                this.timeUntilNextSpike = 8;
            }
        }
        //decrease the value of the timer
        this.timeUntilNextSpike--;
    }

    draw(ctx) {
        this.spikes.forEach((spike) => {
            //remove the spike if it is off screen
            if(this.isSpikeOffScreen(spike)){
                const index = this.spikes.indexOf(spike);
                this.spikes.splice(index, 1) //remove 1 spike from spikes list at index of the current spike
            }
            spike.draw(ctx);
        })
    }

    isSpikeOffScreen(spike){
        return spike.yPos <= 0
    }

    collideWithBubble(sprite){
        return this.spikes.some(spike =>{ //some returns true if there is at least one spike colliding
            if(spike.collideWithBubble(sprite)){ //spike also has a collidesWith method
                const index = this.spikes.indexOf(spike);
                this.spikes.splice(index, 1); //take the spike off of the screen since it already has hit something
                return true;
            }
            return false;
        })
    }
}
