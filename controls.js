class Controls{
    constructor(){
        this.up=false
        this.down=false
        this.left=false
        this.right=false
        this.pickUp=false

        this.#addKeyboardListeners()
    }

    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.up=true;
                    break;
                case "ArrowDown":
                    this.down=true;
                    break;
            }
            switch(event.key){
                case "a":
                    this.left=true;
                    break;
                case "d":
                    this.right=true;
                    break;
                case "w":
                    this.up=true;
                    break;
                case "s":
                    this.down=true;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false
                    break;
                case "ArrowRight":
                    this.right=false
                    break;
                case "ArrowUp":
                    this.up=false
                    break;
                case "ArrowDown":
                    this.down=false
            }
            switch(event.key){
                case "a":
                    this.left=false
                    break;
                case "d":
                    this.right=false
                    break;
                case "w":
                    this.up=false
                    break;
                case "s":
                    this.down=false
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case " ":
                    this.pickUp = true
                    break;
            }
        }
    }
}