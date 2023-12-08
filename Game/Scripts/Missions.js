class Missions extends Phaser.GameObjects.Group
{
    constructor(numMission, player1, scene)
    {
        super({key:"Missions"})
        this.mission = numMission;
        this.player1 = player1;
        this.scene = scene;
        //Mision 1: visitar esquinas
        this.corners = [{name: 'UpLeft', x: 0, y: 0 },{name: 'UpRight', x: game.config.width, y: 0 },{ name: 'DownLeft' ,x: 0, y: game.config.height },{name: 'DownRight', x: game.config.width, y: game.config.height }];
        this.visited = {UpLeft: false, UpRight: false, DownLeft: false, DownRight: false};
        //Misiones 2 y 3: contadores de tiempo
        this.timeLeft = 60000; 
        //Misión 4: tiempos límite
        this.timeInCrowd = 0 //Van a ser 30 segundos
    }

    CheckMission()
    {
        switch(this.mission)
        {
            case 1:
                this.Mission1()
                break;
            case 2:
                this.Mission2()
                break;
            case 3:
                this.Mission3()
                break;
            case 4:
                this.Mission4()
                break;
        }
    }

    Mission1()
    {
        var allVisited = true;
        this.corners.forEach((corner) => 
        { 
            this.CheckCorner(corner);
            if(!this.visited[corner.name]) allVisited = false;
        });
        
        if(allVisited)
        {
            this.player1.missionAccomplished = true;
        }
    }

    CheckCorner(corner)
    {
        var margen = 200; //Margen para dar pie a que las coordenadas sean correctas 
        if(
            this.player1.body.x >= corner.x - margen &&
            this.player1.body.x <= corner.x + margen &&
            this.player1.body.y >= corner.y - margen &&
            this.player1.body.y <= corner.y + margen
        ) this.visited[corner.name] = true;
    }

    Mission2()
    {
        if (this.player1.direction !== "Quieto") 
        {
            this.timeLeft -= game.loop.delta;
            if(this.timeLeft <= 0) this.player1.missionAccomplished = true;
        } 
        console.log(this.timeLeft);
    }

    Mission3()
    {
        if (this.player1.direction === "Quieto") 
        {
            this.timeLeft -= game.loop.delta;
            if(this.timeLeft <= 0) this.player1.missionAccomplished = true;
        }
        console.log(this.timeLeft);
    }

    Mission4(){
        let crowd = 0;
        this.scene.npcs.forEach((objeto)=>{ //Calcula la distancia entre el jugador y cada NPC
            var distanceNPC = Phaser.Math.Distance.Between(this.player1.body.x,this.player1.body.y, objeto.body.x,objeto.body.y)
            if(distanceNPC <= 100){  //Si la distancia es menor o igual a 100, se suma 1 a la variable crowd, que representa la aglomeración
                crowd++
                console.log(crowd)
            }
        })
            if(crowd >= 2){ //Si el jugador está cerca de 2 o más NPCs, ya se considera aglomeración y comienza la misión (le pongo 2 porque como los movimientos son aleatorios es complicado ya de por sí)
                this.timeInCrowd += game.loop.delta;
                console.log(this.timeInCrowd)
                if(this.timeInCrowd>=30000) this.player1.missionAccomplished = true;
                
             } else this.timeInCrowd = 0; 
    }
}