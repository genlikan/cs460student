Robot = function( x , y , z ) {
// head and behind of head
this.head = new THREE.Bone();
this.head.position.set( x, y, z );

this.left_occipital = new THREE.Bone();
this.left_occipital.position.x = 5;

this.right_occipital = new THREE.Bone();
this.right_occipital.position.x = -5;

this.head.add(this.left_occipital);
this.head.add(this.right_occipital);

this.left_parietal = new THREE.Bone();
this.left_parietal.position.y = 10;

this.right_parietal = new THREE.Bone();
this.right_parietal.position.y = 10;

this.top_parietal = new THREE.Bone();
this.top_parietal.position.x = -10;

this.left_occipital.add(this.left_parietal);
this.right_occipital.add(this.right_parietal);

this.left_parietal.add(this.top_parietal);

// head depth

this.left_face_bottom = new THREE.Bone();
this.left_face_bottom.position.z = 10;

this.right_face_bottom = new THREE.Bone();
this.right_face_bottom.position.z = 10;

this.left_occipital.add(this.left_face_bottom);
this.right_occipital.add(this.right_face_bottom);

this.left_face_top = new THREE.Bone();
this.left_face_top.position.z = 10;

this.right_face_top = new THREE.Bone();
this.right_face_top.position.z = 10;

this.left_parietal.add(this.left_face_top);
this.right_parietal.add(this.right_face_top);

// head face

this.left_face = new THREE.Bone();
this.left_face.position.y = -10;

this.right_face = new THREE.Bone();
this.right_face.position.y = -10;

this.left_face_top.add(this.left_face);
this.right_face_top.add(this.right_face);

this.face_top = new THREE.Bone();
this.face_top.position.x = 10;

this.face_bottom = new THREE.Bone();
this.face_bottom.position.x = 10;

this.right_face_top.add(this.face_top);
this.right_face.add(this.face_bottom);

// neck and torso

this.neck = new THREE.Bone();
this.neck.position.y = -5;

this.head.add(this.neck);

this.torso = new THREE.Bone();
this.torso.position.y = -25;

this.neck.add(this.torso);

// left arm
this.left_shoulder = new THREE.Bone();
this.left_shoulder.position.x = 6;

this.neck.add(this.left_shoulder);

this.left_upper_arm = new THREE.Bone();
this.left_upper_arm.position.x = 5;
this.left_upper_arm.position.y = -12;

this.left_shoulder.add(this.left_upper_arm);

this.left_lower_arm = new THREE.Bone();
this.left_lower_arm.position.x = 3;
this.left_lower_arm.position.y = -10;

this.left_upper_arm.add(this.left_lower_arm);

this.left_hand = new THREE.Bone();
this.left_hand.position.x = -1;
this.left_hand.position.y = -5;

this.left_lower_arm.add(this.left_hand);

// right arm
this.right_shoulder = new THREE.Bone();
this.right_shoulder.position.x = -6;

this.neck.add(this.right_shoulder);

this.right_upper_arm = new THREE.Bone();
this.right_upper_arm.position.x = -5;
this.right_upper_arm.position.y = -12;

this.right_shoulder.add(this.right_upper_arm);

this.right_lower_arm = new THREE.Bone();
this.right_lower_arm.position.x = -3;
this.right_lower_arm.position.y = -10;

this.right_upper_arm.add(this.right_lower_arm);

this.right_hand = new THREE.Bone();
this.right_hand.position.x = 1;
this.right_hand.position.y = -5;

this.right_lower_arm.add(this.right_hand);

// left leg
this.left_hip = new THREE.Bone();
this.left_hip.position.x = 3;

this.torso.add(this.left_hip);

this.left_upper_leg = new THREE.Bone();
this.left_upper_leg.position.x = 5;
this.left_upper_leg.position.y = -17;

this.left_hip.add(this.left_upper_leg);

this.left_lower_leg = new THREE.Bone();
this.left_lower_leg.position.x = 4;
this.left_lower_leg.position.y = -16;

this.left_upper_leg.add(this.left_lower_leg);

this.left_foot = new THREE.Bone();
this.left_foot.position.z = 6;

this.left_lower_leg.add(this.left_foot);

// right leg
this.right_hip = new THREE.Bone();
this.right_hip.position.x = -3;

this.torso.add(this.right_hip);

this.right_upper_leg = new THREE.Bone();
this.right_upper_leg.position.x = -5;
this.right_upper_leg.position.y = -17;

this.right_hip.add(this.right_upper_leg);

this.right_lower_leg = new THREE.Bone();
this.right_lower_leg.position.x = -4;
this.right_lower_leg.position.y = -18;

this.right_upper_leg.add(this.right_lower_leg);

this.right_foot = new THREE.Bone();
this.right_foot.position.z = 6;

this.right_lower_leg.add(this.right_foot);

this.movement = null;

};

Robot.prototype.show = function(scene) {

  var rGroup = new THREE.Group();
  rGroup.add( this.head );

  var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 10; // make the skeleton thick

  scene.add(rGroup);
  scene.add(helper);

};

Robot.prototype.onAnimate = function() {

	if (this.movement == 'raise left arm') {
		console.log("RLA");
		var T = -Math.PI;
		this.left_shoulder.quaternion.slerp( new THREE.Quaternion(
		Math.sin(T/2),   // x
        0,               // y
        0,               // z
        Math.cos(T/2)),  // w
        0.1 );
	}  else if (this.movement == 'lower left arm') {
		console.log("LLA");
		var T = 2*Math.PI;
		this.left_shoulder.quaternion.slerp( new THREE.Quaternion(
		Math.sin(T/2),   // x
        0,               // y
        0,               // z
        Math.cos(T/2)),  // w
        0.1 );
	}  else if (this.movement == 'right kick') {
		// check if slerp reached almost the end
		if (this.right_hip.quaternion.w < 0.72) {
			// signal that the kick is done and the leg should move back
			this.movement = 'right kick done';
 
    } else {
      // Kicks Ball 
      var T = -Math.PI/2;
      this.right_hip.quaternion.slerp( new THREE.Quaternion( 
      Math.sin( T / 2 ),   // x
      0,                   // y
      0,                   // z
      Math.cos( T / 2 ) ), // w
      0.1 );
                                      
    }
 
  }  else if (this.movement == 'left kick') {
		// check if slerp reached almost the end
		if (this.left_hip.quaternion.w < 0.72) {
			// signal that the kick is done and the leg should move back
			this.movement = 'left kick done';
 
    } else {
      // Kicks Ball
      var T = -Math.PI/2;
      this.left_hip.quaternion.slerp( new THREE.Quaternion( 
      Math.sin( T / 2 ),   // x
      0,                   // y
      0,                   // z
      Math.cos( T / 2 ) ), // w
      0.1 );
                                      
    }
 
  } else if (this.movement == 'left kick done') {
    // reset left leg back to identity
    this.left_hip.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
	}
	else if (this.movement == 'right kick done') {
    // reset right leg back to identity
    this.right_hip.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
	}
	else if (this.movement == 'time2dance') {
	// It is time2dance!
	console.log("time2dance");
	var T = -Math.PI;
	this.left_shoulder.quaternion.slerp( new THREE.Quaternion(
	0,   // x
    Math.sin(T/2),               // y
    0,               // z
    Math.cos(T/2)),  // w
    0.1 );

    if (this.left_shoulder.quaternion.w < 0.01){
    	this.left_shoulder.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),0,0,1), 0.01 );
    }
    var G = Math.PI;
    this.right_shoulder.quaternion.slerp( new THREE.Quaternion(
	0,   // x
    Math.sin(G/2),               // y
    0,               // z
    Math.cos(G/2)),  // w
    0.1 );

    if (this.right_shoulder.quaternion.w < 0.01){
    	this.right_shoulder.quaternion.slerp( new THREE.Quaternion(Math.sin(G/2),0,0,1), 0.01 );
    }

    

	}
};

Robot.prototype.raise_left_arm = function() {
	this.movement = 'raise left arm';
	console.log("This was raise left arm");
	};

Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm';
	console.log("This was lower left arm");
	};

Robot.prototype.right_kick = function() {
	this.movement = 'right kick';
	console.log("This was a right kick");
	};

Robot.prototype.left_kick = function() {
	this.movement = 'left kick';
	console.log("This was a left kick");
	};

Robot.prototype.dance = function() {
	this.movement = 'time2dance';
	console.log("It's Party Time");
	};