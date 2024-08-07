import { gsap } from 'gsap'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
	backgroundImg,
	shopImg,
	kenjiAttack1,
	kenjiDeath,
	kenjiFall,
	kenjiIdle,
	kenjiJump,
	kenjiRun,
	kenjiTakeHit,
	samuraiMackAttack1,
	samuraiMackDeath,
	samuraiMackFall,
	samuraiMackIdle,
	samuraiMackJump,
	samuraiMackRun,
	samuraiMackTakeHit,
} from '../../img/images.js'


export function useLogickGame(canvasRef) {
  console.log('🚀 canvasRef', canvasRef)
	const { power, dexterity, intelligence } = useSelector(
		(state) => state.characteristics,
	)
	useEffect(() => {
	const canvas = canvasRef.current
	const context = canvas.getContext('2d')

	class Sprite {
		constructor({
			position,
			imageSrc,
			scale = 1,
			framesMax = 1,
			offset = { x: 0, y: 0 },
		}) {
			this.position = position
			this.width = 50
			this.height = 150
			this.image = new Image()
			this.image.src = imageSrc
			this.scale = scale
			this.framesMax = framesMax
			this.framesCurrent = 0
			this.framesElapsed = 0
			this.framesHold = 5
			this.offset = offset
		}

		draw() {
			context.drawImage(
				this.image,
				this.framesCurrent * (this.image.width / this.framesMax),
				0,
				this.image.width / this.framesMax,
				this.image.height,
				this.position.x - this.offset.x,
				this.position.y - this.offset.y,
				(this.image.width / this.framesMax) * this.scale,
				this.image.height * this.scale,
			)
		}

		animateFrames() {
			this.framesElapsed++
			if (this.framesElapsed % this.framesHold === 0) {
				if (this.framesCurrent < this.framesMax - 1) {
					this.framesCurrent++
				} else {
					this.framesCurrent = 0
				}
			}
		}

		update() {
			this.draw()
			this.animateFrames()
		}
	}

	class Fighter extends Sprite {
		constructor({
			position,
			velocity,
			color = 'red',
			imageSrc,
			scale = 1,
			framesMax = 1,
			offset = { x: 0, y: 0 },
			sprites,
			health,
			attackBox = { offset: {}, width: undefined, height: undefined },
		}) {
			super({
				position,
				imageSrc,
				scale,
				framesMax,
				offset,
			})

			this.velocity = velocity
			this.width = 50
			this.height = 150
			this.lastKey = this.lastKey //change
			this.attackBox = {
				position: {
					x: this.position.x,
					y: this.position.y,
				},
				offset: attackBox.offset,
				width: attackBox.width,
				height: attackBox.height,
			}
			this.color = color
			this.isAttacking = this.isAttacking //change
			this.health = health
			this.framesCurrent = 0
			this.framesElapsed = 0
			this.framesHold = 5
			this.sprites = sprites
			this.dead = false

			for (const sprite in this.sprites) {
				sprites[sprite].image = new Image()
				sprites[sprite].image.src = sprites[sprite].imageSrc
			}
		}

		update() {
			this.draw()
			if (!this.dead) this.animateFrames()

			// attack boxes
			this.attackBox.position.x = this.position.x + this.attackBox.offset.x
			this.attackBox.position.y = this.position.y + this.attackBox.offset.y

			// draw the attack box
			context.fillRect(
				this.attackBox.position.x,
				this.attackBox.position.y,
				this.attackBox.width,
				this.attackBox.height,
			)

			this.position.x += this.velocity.x
			this.position.y += this.velocity.y

			// gravity function
			if (
				this.position.y + this.height + this.velocity.y >=
				canvas.height - 96
			) {
				this.velocity.y = 0
				this.position.y = 330
			} else this.velocity.y += gravity
		}

		attack() {
			this.switchSprite('attack1')
			this.isAttacking = true
		}

		takeHit() {
			this.health -= 20

			if (this.health <= 0) {
				this.switchSprite('death')
			} else this.switchSprite('takeHit')
		}

		switchSprite(sprite) {
			if (this.image === this.sprites.death.image) {
				if (this.framesCurrent === this.sprites.death.framesMax - 1)
					this.dead = true
				return
			}

			// overriding all other animations with the attack animation
			if (
				this.image === this.sprites.attack1.image &&
				this.framesCurrent < this.sprites.attack1.framesMax - 1
			)
				return

			// override when fighter gets hit
			if (
				this.image === this.sprites.takeHit.image &&
				this.framesCurrent < this.sprites.takeHit.framesMax - 1
			)
				return

			switch (sprite) {
				case 'idle':
					if (this.image !== this.sprites.idle.image) {
						this.image = this.sprites.idle.image
						this.framesMax = this.sprites.idle.framesMax
						this.framesCurrent = 0
					}
					break
				case 'run':
					if (this.image !== this.sprites.run.image) {
						this.image = this.sprites.run.image
						this.framesMax = this.sprites.run.framesMax
						this.framesCurrent = 0
					}
					break
				case 'jump':
					if (this.image !== this.sprites.jump.image) {
						this.image = this.sprites.jump.image
						this.framesMax = this.sprites.jump.framesMax
						this.framesCurrent = 0
					}
					break

				case 'fall':
					if (this.image !== this.sprites.fall.image) {
						this.image = this.sprites.fall.image
						this.framesMax = this.sprites.fall.framesMax
						this.framesCurrent = 0
					}
					break

				case 'attack1':
					if (this.image !== this.sprites.attack1.image) {
						this.image = this.sprites.attack1.image
						this.framesMax = this.sprites.attack1.framesMax
						this.framesCurrent = 0
					}
					break

				case 'takeHit':
					if (this.image !== this.sprites.takeHit.image) {
						this.image = this.sprites.takeHit.image
						this.framesMax = this.sprites.takeHit.framesMax
						this.framesCurrent = 0
					}
					break

				case 'death':
					if (this.image !== this.sprites.death.image) {
						this.image = this.sprites.death.image
						this.framesMax = this.sprites.death.framesMax
						this.framesCurrent = 0
					}
					break
			}
		}
	}

	canvas.width = 1024
	canvas.height = 576

	context.fillRect(0, 0, canvas.width, canvas.height)

	const gravity = 0.7

	const background = new Sprite({
		position: {
			x: 0,
			y: 0,
		},
		imageSrc: backgroundImg,
	})

	const shop = new Sprite({
		position: {
			x: 600,
			y: 128,
		},
		imageSrc: shopImg,
		scale: 2.75,
		framesMax: 6,
	})

	const player = new Fighter({
		position: {
			x: 150,
			y: 480,
		},
		velocity: {
			x: 0,
			y: 0,
		},
		color: 'red',
		offset: {
			x: 0,
			y: 0,
		},
		imageSrc: samuraiMackIdle,
		framesMax: 8,
		scale: 2.5,
		offset: {
			x: 215,
			y: 157,
		},
		sprites: {
			idle: {
				imageSrc: samuraiMackIdle,
				framesMax: 8,
			},
			run: {
				imageSrc: samuraiMackRun,
				framesMax: 8,
			},
			jump: {
				imageSrc: samuraiMackJump,
				framesMax: 2,
			},
			fall: {
				imageSrc: samuraiMackFall,
				framesMax: 2,
			},
			attack1: {
				imageSrc: samuraiMackAttack1,
				framesMax: 6,
			},
			takeHit: {
				imageSrc: samuraiMackTakeHit,
				framesMax: 4,
			},
			death: {
				imageSrc: samuraiMackDeath,
				framesMax: 6,
			},
		},
		attackBox: {
			offset: {
				x: 100,
				y: 50,
			},
			width: 160 + dexterity,
			height: 50 + dexterity,
		},
		health: 100 + power,
	})

	const enemy = new Fighter({
		position: {
			x: 700,
			y: 480,
		},
		velocity: {
			x: 0,
			y: 0,
		},
		color: 'blue',
		offset: {
			x: -50,
			y: 0,
		},
		imageSrc: kenjiIdle,
		framesMax: 4,
		scale: 2.5,
		offset: {
			x: 215,
			y: 167,
		},
		sprites: {
			idle: {
				imageSrc: kenjiIdle,
				framesMax: 4,
			},
			run: {
				imageSrc: kenjiRun,
				framesMax: 8,
			},
			jump: {
				imageSrc: kenjiJump,
				framesMax: 2,
			},
			fall: {
				imageSrc: kenjiFall,
				framesMax: 2,
			},
			attack1: {
				imageSrc: kenjiAttack1,
				framesMax: 4,
			},
			takeHit: {
				imageSrc: kenjiTakeHit,
				framesMax: 3,
			},
			death: {
				imageSrc: kenjiDeath,
				framesMax: 7,
			},
		},
		attackBox: {
			offset: {
				x: -170,
				y: 50,
			},
			width: 170,
			height: 50,
		},
		health: 100,
	})

	// console.log(player)

	const keys = {
		a: {
			pressed: false,
		},
		d: {
			pressed: false,
		},
		ArrowRight: {
			pressed: false,
		},
		ArrowLeft: {
			pressed: false,
		},
	}

	function rectangularCollision({ rectangle1, rectangle2 }) {
		return (
			rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
			rectangle2.position.x &&
			rectangle1.attackBox.position.x <=
			rectangle2.position.x + rectangle2.width &&
			rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
			rectangle2.position.y &&
			rectangle1.attackBox.position.y <=
			rectangle2.position.y + rectangle2.height
		)
	}

	function animate() {
		window.requestAnimationFrame(animate)
		context.fillStyle = 'black'
		context.fillRect(0, 0, canvas.width, canvas.height)
		background.update()
		shop.update()
		context.fillStyle = 'rgba(255, 255, 255, 0.15)'
		context.fillRect(0, 0, canvas.width, canvas.height)
		player.update()
		enemy.update()

		player.velocity.x = 0
		enemy.velocity.x = 0

		// player movement
		if (keys.a.pressed && player.lastKey === 'a') {
			player.velocity.x = -5 - dexterity
			player.switchSprite('run')
		} else if (keys.d.pressed && player.lastKey === 68) {
			player.velocity.x = 5 + dexterity
			player.switchSprite('run')
		} else {
			player.switchSprite('idle')
		}

		// jumping
		if (player.velocity.y < 0) {
			player.switchSprite('jump')
		} else if (player.velocity.y > 0) {
			player.switchSprite('fall')
		}

		// Enemy movement
		if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
			enemy.velocity.x = -5
			enemy.switchSprite('run')
		} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
			enemy.velocity.x = 5
			enemy.switchSprite('run')
		} else {
			enemy.switchSprite('idle')
		}

		// jumping
		if (enemy.velocity.y < 0) {
			enemy.switchSprite('jump')
		} else if (enemy.velocity.y > 0) {
			enemy.switchSprite('fall')
		}

		// detect for collision & enemy gets hit
		if (
			rectangularCollision({
				rectangle1: player,
				rectangle2: enemy,
			}) &&
			player.isAttacking &&
			player.framesCurrent === 4
		) {
			enemy.takeHit()
			player.isAttacking = false

			gsap.to('#enemyHealth', {
				width: enemy.health + '%',
			})
		}

		// if player misses
		if (player.isAttacking && player.framesCurrent === 4) {
			player.isAttacking = false
		}

		// this is where our player gets hit
		if (
			rectangularCollision({
				rectangle1: player,
				rectangle2: enemy,
			}) &&
			enemy.isAttacking &&
			enemy.framesCurrent === 2
		) {
			player.takeHit()
			enemy.isAttacking = false

			gsap.to('#playerHealth', {
				width: player.health + '%',
			})
		}

		// if player misses
		if (enemy.isAttacking && enemy.framesCurrent === 2) {
			enemy.isAttacking = false
		}
	}

	animate()

	window.addEventListener('keydown', (event) => {
		if (!player.dead) {
			switch (event.key) {
				case 68:
					keys.d.pressed = true
					player.lastKey = 68
					break
				case 'a':
					keys.a.pressed = true
					player.lastKey = 'a'
					break
				case 'w':
					player.velocity.y = -20 - intelligence
					break
				case ' ':
					player.attack()
					break
			}
		}

		if (!enemy.dead) {
			switch (event.key) {
				case 'ArrowRight':
					keys.ArrowRight.pressed = true
					enemy.lastKey = 'ArrowRight'
					break
				case 'ArrowLeft':
					keys.ArrowLeft.pressed = true
					enemy.lastKey = 'ArrowLeft'
					break
				case 'ArrowUp':
					enemy.velocity.y = -20
					break
				case 'ArrowDown':
					enemy.attack()

					break
			}
		}
	})

	window.addEventListener('keyup', (event) => {
		switch (event.key) {
			case 68:
				keys.d.pressed = false
				break
			case 'a':
				keys.a.pressed = false
				break
		}

		// enemy keys
		switch (event.key) {
			case 'ArrowRight':
				keys.ArrowRight.pressed = false
				break
			case 'ArrowLeft':
				keys.ArrowLeft.pressed = false
				break
		}
	})
}, [])
}
