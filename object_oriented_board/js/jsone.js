
//declaring coins and placing it on the board

var move_count=0,whose_move=1;
var global_x,global_y;
var possible_move_x=[];
var possible_move_y=[];





var white_king_x=7;
var white_king_y=4;
var black_king_x=0;
var black_king_y=4;


var mate_x=[],mate_y=[];

var help_queen_x=[],help_queen_y=[];

var all_x,all_y;


"use strict";
var chessboard=[	
[		new coin("rook","black","&#9820;"),new coin("knight","black","&#9822;"),new coin("bishop","black","&#9821;"),new coin("queen","black","&#9819;"),new coin("king","black","&#9818;"),new coin("bishop","black","&#9821;"),new coin("knight","black","&#9822;"),new coin("rook","black","&#9820;")					],
[		new coin("pawn","black","&#9823;"),new coin("pawn","black","&#9823;"),new coin("pawn","black","&#9823;"),new coin("pawn","black","&#9823;"),new coin("pawn","black","&#9823;"),new coin("pawn","black","&#9823;"),new coin("pawn","black","&#9823;"),new coin("pawn","black","&#9823;")					],
[		new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","","")					],
[		new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","","")					],
[		new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","","")					],
[		new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","",""),new coin("","","")					],
[		new coin("pawn","white","&#9817;"),new coin("pawn","white","&#9817;"),new coin("pawn","white","&#9817;"),new coin("pawn","white","&#9817;"),new coin("pawn","white","&#9817;"),new coin("pawn","white","&#9817;"),new coin("pawn","white","&#9817;"),new coin("pawn","white","&#9817;")			],
[		new coin("rook","white","&#9814;"),new coin("knight","white","&#9816;"),new coin("bishop","white","&#9815;"),new coin("queen","white","&#9813;"),new coin("king","white","&#9812;"),new coin("bishop","white","&#9815;"),new coin("knight","white","&#9816;"),new coin("rook","white","&#9814;")					]
];


function coin(name, color,code) {

			if(name)
			{
			  this.name = name;
			  this.color = color;
			  this.code=code;
			}
			else
			{
			  this.name = "null";
			  this.color = "null";
			  this.code="";

			}


 }

build_board();
//declaring coins and placing it on the board







coin.prototype.move = function() {
				this.name=chessboard[global_x][global_y].name;
				this.color=chessboard[global_x][global_y].color;
				this.code=chessboard[global_x][global_y].code;


				







				chessboard[global_x][global_y].name="null";
				chessboard[global_x][global_y].color="null";
				chessboard[global_x][global_y].code="";
				move_count=0;
				whose_move=toggle(whose_move)
				this.remove_hightlight_possible_position();
				build_board();

};

coin.prototype.remove_hightlight_possible_position=function()
{

								for (var i=0;i<possible_move_x.length;i++) {
												 document.getElementById((possible_move_x[i]*10)+(possible_move_y[i])).classList.remove("highlight");
												document.getElementById((possible_move_x[i]*10)+(possible_move_y[i])).classList.remove("highlightenemy");
										
								}}

coin.prototype.hightlight_possible_position=function()
{

								for (var i=0;i<possible_move_x.length;i++) {
											if(chessboard[possible_move_x[i]][possible_move_y[i]].color == "null")
											{
												 // element.classList.add("highlight");
												 document.getElementById((possible_move_x[i]*10)+(possible_move_y[i])).classList.add("highlight");

											}
											else
											{
												document.getElementById((possible_move_x[i]*10)+(possible_move_y[i])).classList.add("highlightenemy");
											}
								}}

coin.prototype.coin_has_power=function(x,y)
{


								for (var i=0;i<possible_move_x.length;i++) {
											if((possible_move_x[i]==x)&&(possible_move_y[i]==y))
											{
												
												return true;
											}
								}


								alert(chessboard[global_x][global_y].name + "does have power")	
								return false;}


// functions begins here
function main_function(obj)
{

	var	dummy=document.getElementById(obj.id);
	var x	=	dummy.getAttribute("x");
	var y	=	dummy.getAttribute("y");

					if (move_count == 0)
					{
								if (movevalidate(chessboard[x][y]))
								{
									global_x=x;
									global_y=y;
									move_count=1;
									chessboard[x][y].calculate_possible();
								}

					}
					else
					{
								if(is_it_mycoin(chessboard[x][y]))
								{

									if(chessboard[x][y].coin_has_power(x,y))
									{


												chessboard[x][y].move();

												if ((chessboard[global_x][global_y].name=="king") && (chessboard[global_x][global_y].color=='black'))
												{
												
															white_king_x=parseInt(x);
															white_king_y=parseInt(y);}
												if ((chessboard[global_x][global_y].name=="king") && (chessboard[global_x][global_y].color=='white'))
												{
															black_king_x=parseInt(x);
															black_king_y=parseInt(y);}

												is_it_check(x,y);
												checking_check_mate(x,y);

									}
									

								
								}
								else
								{
									
													global_x=x;
													global_y=y;
													move_count=1;
													chessboard[x][y].remove_hightlight_possible_position();
													chessboard[x][y].calculate_possible();

								}
					}

}










function movevalidate(obj)
{
	// var	dummy=document.getElementById(obj.id);
	// var x	=	dummy.getAttribute("x");
	// var y	=	dummy.getAttribute("y");



		if (obj==undefined	)
		{	
			alert("No coin")
			return false;
		}


		if ((obj.color=="white" && whose_move == 1)	|| (obj.color=="black" && whose_move == 0))
		{	

			return true;
		}

		else
		{

			if(obj.color=="white")
			{
				// alert("black turn")
				alert("black move");
			}
			else
			{
				alert("white move");
				// alert("white turn")
			}

			return false;
		}
}

function build_board()
{
	for (var i = 0; i<8; i++) {
	for (var j = 0; j<8; j++)
	{
		 	 document.getElementById(	((i*10)+j)	).innerHTML=chessboard[i][j].code;
	}	}
}


function is_it_mycoin(obj)
{

		 if (obj.color==chessboard[global_x][global_y].color)
		 {
		 	return false;
		 }
		 else
		 {

		 	return true;
		 }
}


function toggle(x)
{
	if(x)
	{
		return 0;
	}
	else
	{
		return 1;
	}
}

function calculate_pawn(i_one,j_one)
{


			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];
								if(chessboard[i_one][j_one].color=="black")
								{

															if(i_one==1)
															{

																		if(chessboard[(parseInt(i_one)+1)][j_one].name	==	"null")
																		{
																					temp_array_x[temp_x++]=(parseInt(i_one)+1);
																					temp_array_y[temp_y++]=(parseInt(j_one));
																					
																					if(chessboard[(parseInt(i_one)+2)][j_one].name=="null")
																					{
																						temp_array_x[temp_x++]=(parseInt(i_one)+2);
																						temp_array_y[temp_y++]=(parseInt(j_one));
																					}
																		}

															}
															else if (i_one==7)
															{
																			temp_array_x[temp_x++]="";
																			temp_array_y[temp_y++]="";
															}
															else
															{
																			if(chessboard[parseInt(i_one)+1][j_one].name=="null")
																				{
																					temp_array_x[temp_x++]=(parseInt(i_one)+1);
																					temp_array_y[temp_y++]=(parseInt(j_one));
																				}

															}




															if (j_one==0)
															{

																if(chessboard[parseInt(i_one)+1][parseInt(j_one)+1].color=="white")
																	{
																	
																		temp_array_x[temp_x++]=(parseInt(i_one)+1);
																		temp_array_y[temp_y++]=(parseInt(j_one)+1);
																	
																	}
															}
															else if(j_one==7)
															{
																	if(chessboard[parseInt(i_one)+1][parseInt(j_one)-1].color=="white")
																	{
																		temp_array_x[temp_x++]=(parseInt(i_one)+1);
																		temp_array_y[temp_y++]=(parseInt(j_one)-1);
																	}

															}
															else
															{
																if(chessboard[parseInt(i_one)+1][parseInt(j_one)+1].color=="white")
																	{
																		temp_array_x[temp_x++]=(parseInt(i_one)+1);
																		temp_array_y[temp_y++]=(parseInt(j_one)-1);
																	}

																if(chessboard[parseInt(i_one)+1][parseInt(j_one)-1].color=="white")
																	{
																		temp_array_x[temp_x++]=(parseInt(i_one)+1);
																		temp_array_y[temp_y++]=(parseInt(j_one)-1);
																	}

															}
							



								}
								else
								{

															if(i_one==6)
															{

																		if(chessboard[(parseInt(i_one)-1)][j_one].name	==	"null")
																		{
																					temp_array_x[temp_x++]=(parseInt(i_one)-1);
																					temp_array_y[temp_y++]=(parseInt(j_one));
																					
																					if(chessboard[(parseInt(i_one)-2)][j_one].name=="null")
																					{
																						temp_array_x[temp_x++]=(parseInt(i_one)-2);
																						temp_array_y[temp_y++]=(parseInt(j_one));
																					}
																		}

															}
															else if (i_one==0)
															{
																			temp_array_x[temp_x++]="";
																			temp_array_y[temp_y++]="";
															}
															else
															{
																			if(chessboard[parseInt(i_one)-1][j_one].name=="null")
																				{
																					temp_array_x[temp_x++]=(parseInt(i_one)-1);
																					temp_array_y[temp_y++]=(parseInt(j_one));
																				}

															}








															if (j_one==0)
															{

																if(chessboard[parseInt(i_one)-1][parseInt(j_one)+1].color=="black")
																	{
																	
																		temp_array_x[temp_x++]=(parseInt((i_one)-1));
																		temp_array_y[temp_y++]=(parseInt(j_one)+1);
																	
																	}
															}
															else if(j_one==7)
															{
																	if(chessboard[parseInt(i_one)-1][parseInt(j_one)-1].color=="black")
																	{
																		temp_array_x[temp_x++]=(parseInt((i_one)-1));
																		temp_array_y[temp_y++]=(parseInt(j_one)-1);
																	}

															}
															else
															{
																if(chessboard[parseInt(i_one)-1][parseInt(j_one)+1].color=="black")
																	{
																		temp_array_x[temp_x++]=(parseInt((i_one)-1));
																		temp_array_y[temp_y++]=(parseInt(j_one)+1);
																	}

																if(chessboard[parseInt(i_one)-1][parseInt(j_one)-1].color=="black")
																	{
																		temp_array_x[temp_x++]=(parseInt((i_one)-1));
																		temp_array_y[temp_y++]=(parseInt(j_one)-1);
																	}

															}

								}


								possible_move_x=[]
								possible_move_y=[]

								possible_move_x=temp_array_x.slice();
								possible_move_y=temp_array_y.slice();


								return[temp_array_x,temp_array_y];
}

function calculate_rook(i_one,j_one)
{

			i_one=parseInt(i_one)
			j_one=parseInt(j_one)
			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];
			 


				for (var i = i_one+1;  i <=7; i=i+1) {

								if (chessboard[i][j_one].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j_one)
									
								}
								else if(chessboard[i_one][j_one].color==chessboard[i][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j_one)
									break;
								}
					
					}




				for (var i = i_one-1;  i >=0; i=i-1) {

								if (chessboard[i][j_one].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j_one)
									
								}
								else if(chessboard[i_one][j_one].color==chessboard[i][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j_one)
									break;
								}
					
					}
				

				for (var i = j_one+1;  i <=7; i=i+1) {

								if (chessboard[i_one][i].name == "null")
								{
									temp_array_x.push(i_one)
									temp_array_y.push(i)
									
								}
								else if(chessboard[i_one][i].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i_one)
									temp_array_y.push(i)
									break;
								}
					
					}


				for (var i = j_one-1;  i>=0; i=i-1) {

								if (chessboard[i_one][i].name == "null")
								{
									temp_array_x.push(i_one)
									temp_array_y.push(i)
									
								}
								else if(chessboard[i_one][i].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i_one)
									temp_array_y.push(i)
									break;
								}
					
					}














								possible_move_x=[]
								possible_move_y=[]

								possible_move_x=temp_array_x.slice();
								possible_move_y=temp_array_y.slice();


								return[temp_array_x,temp_array_y];
}

function calculate_bishop(i_one,j_one)
{


			i_one=parseInt(i_one)
			j_one=parseInt(j_one)
			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];






				for (var i = i_one+1,j=j_one+1;		i<=7 && j<=7;		 i=i+1,j=j+1)
					{


								if (chessboard[i][j].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									
								}
								else if(chessboard[i][j].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									break;
								}


					}





				for (var i = i_one-1,j=j_one-1;		i>=0 && j>=0;		 i=i-1,j=j-1)
					{


								if (chessboard[i][j].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									
								}
								else if(chessboard[i][j].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									break;
								}


					}


				for (var i = i_one+1,j=j_one-1;		i<=7 && j>=0;		 i=i+1,j=j-1)
					{


								if (chessboard[i][j].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									
								}
								else if(chessboard[i][j].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									break;
								}


					}


					for (var i = i_one-1,j=j_one+1;		i>=0 && j<=7;		 i=i-1,j=j+1)
					{


								if (chessboard[i][j].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									
								}
								else if(chessboard[i][j].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									break;
								}


					}




								possible_move_x=[]
								possible_move_y=[]

								possible_move_x=temp_array_x.slice();
								possible_move_y=temp_array_y.slice();


								return[temp_array_x,temp_array_y];}

function calculate_queen(i_one,j_one)
{
			var temp_array_x=[];
			var temp_array_y=[];



			calculate_bishop(i_one,j_one)
			var array_x = possible_move_x.slice(); 
			var array_y = possible_move_y.slice();


			calculate_rook(i_one,j_one)
			var array_one_x = possible_move_x.slice(); 
			var array_one_y = possible_move_y.slice();

			possible_move_x=[]
			possible_move_y=[]


			possible_move_x	=	array_x.concat(array_one_x);
			possible_move_y	=	array_y.concat(array_one_y);

			temp_array_x=possible_move_x.slice();
			temp_array_y=possible_move_y.slice();




			
			return [temp_array_x,temp_array_y];}

function calculate_king(i_one,j_one)
{

			i_one=parseInt(i_one)
			j_one=parseInt(j_one)
			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];

			var arrayone=[i_one,i_one,i_one+1,i_one+1,i_one+1,i_one-1,i_one-1,i_one-1];
			var arraytwo=[j_one-1,j_one+1,j_one-1,j_one,j_one+1,j_one-1,j_one,j_one+1];



							for (var i =0;  i<=8; i=i+1) 
							{

								if(	0<=arrayone[i] && arrayone[i]<=7	&& 		0<=arraytwo[i] && arraytwo[i]<=7)
									{
												if (chessboard[arrayone[i]][arraytwo[i]].name == "null")
												{
													temp_array_x.push(arrayone[i])
													temp_array_y.push(arraytwo[i])
													
												}
												else if(chessboard[i_one][j_one].color==chessboard[arrayone[i]][arraytwo[i]].color)
												{
													
												}
												else
												{
													temp_array_x.push(arrayone[i])
													temp_array_y.push(arraytwo[i])
													
												}
									}
							}


								possible_move_x=[]
								possible_move_y=[]

								possible_move_x=temp_array_x.slice();
								possible_move_y=temp_array_y.slice();


								return[temp_array_x,temp_array_y];}


function calculate_knight(i_one,j_one)
{
			i_one=parseInt(i_one)
			j_one=parseInt(j_one)
			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];

			var arrayone=[i_one+2,i_one+2,i_one-2,i_one-2,i_one+1,i_one+1,i_one-1,i_one-1];
			var arraytwo=[j_one-1,j_one+1,j_one-1,j_one+1,j_one+2,j_one-2,j_one+2,j_one-2];



							for (var i =0;  i<=8; i=i+1) 
							{

								if(	0<=arrayone[i] && arrayone[i]<=7	&& 		0<=arraytwo[i] && arraytwo[i]<=7)
									{
												if (chessboard[arrayone[i]][arraytwo[i]].name == "null")
												{
													temp_array_x.push(arrayone[i])
													temp_array_y.push(arraytwo[i])
													
												}
												else if(chessboard[i_one][j_one].color==chessboard[arrayone[i]][arraytwo[i]].color)
												{
													
												}
												else
												{
													temp_array_x.push(arrayone[i])
													temp_array_y.push(arraytwo[i])
													
												}
									}
							}


								possible_move_x=[]
								possible_move_y=[]

								possible_move_x=temp_array_x.slice();
								possible_move_y=temp_array_y.slice();

								return[temp_array_x,temp_array_y];

}





coin.prototype.calculate_possible=function()
{
	switch(this.name)
	{

		case "pawn":
			 	calculate_pawn(global_x,global_y);
			 	break;

		case "rook":
			 	calculate_rook(global_x,global_y);
			 	break;


		case "knight":
			 	calculate_knight(global_x,global_y);
			 	break;


		case "bishop":
			 	calculate_bishop(global_x,global_y);
			 	break;

		case "queen":
			 	calculate_queen(global_x,global_y);
			 	break;

		case "king":
				calculate_king(global_x,global_y);
			 	break;

		default:
				alert('default')
				break;


	}





var t_x=[];
var t_y=[];

var temp_color=chessboard[global_x][global_y].color;
var temp_code=chessboard[global_x][global_y].code;
var temp_name=chessboard[global_x][global_y].name;
	



chessboard[global_x][global_y].color="null";
chessboard[global_x][global_y].code="";
chessboard[global_x][global_y].name="null";


var temp_white_king_x =	white_king_x;
var temp_white_king_y =	white_king_y;
var temp_black_king_x =	black_king_x;
var temp_black_king_y =	black_king_y;



	for (var i = 0; i < possible_move_x.length; i++) {



			var dummy_color=chessboard[possible_move_x[i]][possible_move_y[i]].color;
			var dummy_code=chessboard[possible_move_x[i]][possible_move_y[i]].code;
			var dummy_name=chessboard[possible_move_x[i]][possible_move_y[i]].name;



			chessboard[possible_move_x[i]][possible_move_y[i]].color=temp_color;
			chessboard[possible_move_x[i]][possible_move_y[i]].code=temp_code;
			chessboard[possible_move_x[i]][possible_move_y[i]].name=temp_name;




				 			if((temp_name=="king") && (temp_color=="white"))
	 						{
	 							white_king_x=parseInt(possible_move_x[i]);
	 							white_king_y=parseInt(possible_move_y[i]);
	 						}

	 						if((temp_name=="king") && (temp_color=="black"))
	 						{
	 							black_king_x=parseInt(possible_move_x[i]);
	 							black_king_y=parseInt(possible_move_y[i]);
	 						}






				find_enemy_team_color(temp_color);

				





							if(temp_color=="white")
							{


												for (var j = 0; j < all_x.length; j++)
												{

													if((all_x[j]==white_king_x) &&	(all_y[j]==white_king_y))
													{

															// alert("danger white")
															t_x.push(possible_move_x[i]);
															t_y.push(possible_move_y[i]);

													}
												}
							



							}
							else
							{
												for (var j = 0; j < all_x.length; j++)
												{

													if((all_x[j]==black_king_x) &&	(all_y[j]==black_king_y))
													{

															// alert("danger black")
															t_x.push(possible_move_x[i]);
															t_y.push(possible_move_y[i]);

													}
												}
								
							}



					console.log("====>")
					console.log("danger spot x"+t_x)
					console.log("danger spot y "+t_y)

					console.log("possible x==="+possible_move_x)
					console.log("possible y=="+possible_move_y)


					console.log("whitekin===>"+white_king_x+"==="+white_king_y)
					console.log("black in===>"+black_king_x+"==="+black_king_y)




			chessboard[possible_move_x[i]][possible_move_y[i]].color=dummy_color;
			chessboard[possible_move_x[i]][possible_move_y[i]].code=dummy_code;
			chessboard[possible_move_x[i]][possible_move_y[i]].name=dummy_name;



			white_king_x=temp_white_king_x;
			white_king_y=temp_white_king_y;	
			black_king_x=temp_black_king_x;
			black_king_y=temp_black_king_y;



				}




// alert("ello")
var z_x=[]
var z_y=[]
var len=possible_move_x.length;
var flag=0;
temp=0;


	for (var k = 0; k < len; k++) {
		
		flag=0;

		for (var m = 0; m < t_x.length; m++) 
		{
			if(	( t_x[m] == possible_move_x[k] )	&&	( t_y[m] == possible_move_y[k] ) )
			{

				flag=1;
			}
		}

		if(flag==0)
		{
			z_x.push(possible_move_x[k])
			z_y.push(possible_move_y[k])

		}
	}



possible_move_x=z_x.slice()
possible_move_y=z_y.slice()






	// console.log("====>")
	// 				console.log("----"+all_x)
	// 				console.log("-----"+all_y)
	// 				console.log("p_m_w"+possible_move_x)
	// 				console.log("p_m_b"+possible_move_y)
	// 				console.log("whitekin===>"+white_king_x+"==="+white_king_y)

	// 				console.log("black in===>"+black_king_x+"==="+black_king_y)















chessboard[global_x][global_y].color=temp_color;
chessboard[global_x][global_y].code=temp_code;
chessboard[global_x][global_y].name=temp_name;

	this.hightlight_possible_position();
}







function find_enemy_team_color(temp_color)
{


	 if(temp_color=="white")
	 {
		calculate_enemy("black");
	 }
	 else
	 {
	 	calculate_enemy("white");
	 }
}









function calculate_enemy(c)
{


		 	all_x=[];
			all_y=[];
			

			for (var i = 0; i <=7; i++) {
			for (var j = 0; j <=7; j++) {
					
				if (chessboard[i][j].color==c)
			 	{
			 		attack(i,j);
			 	}

			}}}




function attack(i,j)
{



	switch(chessboard[i][j].name)
	{

		case "pawn":
			 	cal_pawn(i,j);
			 	break;

		case "rook":
			 	cal_rook(i,j);
			 	break;


		case "knight":
			 	cal_knight(i,j);
			 	break;


		case "bishop":
			 	cal_bishop(i,j);
			 	break;

		case "queen":
			 	cal_queen(i,j);
			 	break;

		case "king":
				cal_king(i,j);
			 	break;

		default:
				alert('default')
				break;

	}





}



























function cal_pawn()
{
}

function cal_king(i_one,j_one)
{


			i_one=parseInt(i_one)
			j_one=parseInt(j_one)
			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];

			var arrayone=[i_one,i_one,i_one+1,i_one+1,i_one+1,i_one-1,i_one-1,i_one-1];
			var arraytwo=[j_one-1,j_one+1,j_one-1,j_one,j_one+1,j_one-1,j_one,j_one+1];



							for (var i =0;  i<=8; i=i+1) 
							{

								if(	0<=arrayone[i] && arrayone[i]<=7	&& 		0<=arraytwo[i] && arraytwo[i]<=7)
									{
												if (chessboard[arrayone[i]][arraytwo[i]].name == "null")
												{
													temp_array_x.push(arrayone[i])
													temp_array_y.push(arraytwo[i])
													
												}
												else if(chessboard[i_one][j_one].color==chessboard[arrayone[i]][arraytwo[i]].color)
												{
													
												}
												else
												{
													temp_array_x.push(arrayone[i])
													temp_array_y.push(arraytwo[i])
													
												}
									}
							}



							for (var i = 0; i < temp_array_x.length; i++) {
								all_x.push(temp_array_x[i]);
								all_y.push(temp_array_y[i]);
							}
}

function cal_queen(i_one,j_one)
{

			var temp_array_x=[];
			var temp_array_y=[];



			help_queen_x=[]
			help_queen_y=[]

			cal_bishop(i_one,j_one)
			
			 temp_array_x=temp_array_x.concat(help_queen_x.slice());
			 temp_array_y=temp_array_y.concat(help_queen_y.slice());


			 help_queen_x=[]
			 help_queen_y=[]

			cal_rook(i_one,j_one)
			temp_array_x=temp_array_x.concat(help_queen_x.slice());
			temp_array_y=temp_array_y.concat(help_queen_y.slice());




			for (var i = 0; i < temp_array_x.length; i++) {
								all_x.push(temp_array_x[i]);
								all_y.push(temp_array_y[i]);
							}
}

function cal_bishop(i_one,j_one)
{


			i_one=parseInt(i_one)
			j_one=parseInt(j_one)
			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];






				for (var i = i_one+1,j=j_one+1;		i<=7 && j<=7;		 i=i+1,j=j+1)
					{


								if (chessboard[i][j].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									
								}
								else if(chessboard[i][j].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									break;
								}


					}





				for (var i = i_one-1,j=j_one-1;		i>=0 && j>=0;		 i=i-1,j=j-1)
					{


								if (chessboard[i][j].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									
								}
								else if(chessboard[i][j].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									break;
								}


					}


				for (var i = i_one+1,j=j_one-1;		i<=7 && j>=0;		 i=i+1,j=j-1)
					{


								if (chessboard[i][j].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									
								}
								else if(chessboard[i][j].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									break;
								}


					}


					for (var i = i_one-1,j=j_one+1;		i>=0 && j<=7;		 i=i-1,j=j+1)
					{


								if (chessboard[i][j].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									
								}
								else if(chessboard[i][j].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j)
									break;
								}


					}


					help_queen_x=temp_array_x.slice();
					help_queen_y=temp_array_y.slice();





					for (var i = 0; i < temp_array_x.length; i++) {
								all_x.push(temp_array_x[i]);
								all_y.push(temp_array_y[i]);
							}}

function cal_rook(i_one,j_one)
{

			i_one=parseInt(i_one)
			j_one=parseInt(j_one)
			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];
			 


				for (var i = i_one+1;  i <=7; i=i+1) {

								if (chessboard[i][j_one].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j_one)
									
								}
								else if(chessboard[i_one][j_one].color==chessboard[i][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j_one)
									break;
								}
					
					}




				for (var i = i_one-1;  i >=0; i=i-1) {

								if (chessboard[i][j_one].name == "null")
								{
									temp_array_x.push(i)
									temp_array_y.push(j_one)
									
								}
								else if(chessboard[i_one][j_one].color==chessboard[i][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i)
									temp_array_y.push(j_one)
									break;
								}
					
					}
				

				for (var i = j_one+1;  i <=7; i=i+1) {

								if (chessboard[i_one][i].name == "null")
								{
									temp_array_x.push(i_one)
									temp_array_y.push(i)
									
								}
								else if(chessboard[i_one][i].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i_one)
									temp_array_y.push(i)
									break;
								}
					
					}


				for (var i = j_one-1;  i>=0; i=i-1) {

								if (chessboard[i_one][i].name == "null")
								{
									temp_array_x.push(i_one)
									temp_array_y.push(i)
									
								}
								else if(chessboard[i_one][i].color==chessboard[i_one][j_one].color)
								{
									break;
								}
								else
								{
									temp_array_x.push(i_one)
									temp_array_y.push(i)
									break;
								}
					
					}




					help_queen_x=temp_array_x.slice();
					help_queen_y=temp_array_y.slice();


						for (var i = 0; i < temp_array_x.length; i++) {
								all_x.push(temp_array_x[i]);
								all_y.push(temp_array_y[i]);
							}
}

function cal_knight(i_one,j_one)
{
			i_one=parseInt(i_one)
			j_one=parseInt(j_one)
			var temp_x=0;
			var temp_y=0;
			var temp_array_x=[];
			var temp_array_y=[];

			var arrayone=[i_one+2,i_one+2,i_one-2,i_one-2,i_one+1,i_one+1,i_one-1,i_one-1];
			var arraytwo=[j_one-1,j_one+1,j_one-1,j_one+1,j_one+2,j_one-2,j_one+2,j_one-2];



							for (var i =0;  i<=8; i=i+1) 
							{

								if(	0<=arrayone[i] && arrayone[i]<=7	&& 		0<=arraytwo[i] && arraytwo[i]<=7)
									{
												if (chessboard[arrayone[i]][arraytwo[i]].name == "null")
												{
													temp_array_x.push(arrayone[i])
													temp_array_y.push(arraytwo[i])
													
												}
												else if(chessboard[i_one][j_one].color==chessboard[arrayone[i]][arraytwo[i]].color)
												{
													
												}
												else
												{
													temp_array_x.push(arrayone[i])
													temp_array_y.push(arraytwo[i])
													
												}
									}
							}



							for (var i = 0; i < temp_array_x.length; i++) {
								all_x.push(temp_array_x[i]);
								all_y.push(temp_array_y[i]);
							}}

function is_it_check(x,y)
{
				all_x=[];
				all_y=[];
				attack(x,y)
				var flag=0;


											if(chessboard[x][y].color=="black")
											{


																for (var j = 0; j < all_x.length; j++)
																{

																	if((all_x[j]==white_king_x) &&	(all_y[j]==white_king_y))
																	{

																			if(flag==0)
																			{
																			alert("check white king")
																			flag=1;
																			}

																	}
																}
											



											}
											else
											{
																for (var j = 0; j < all_x.length; j++)
																{

																	if((all_x[j]==black_king_x) &&	(all_y[j]==black_king_y))
																	{
																			if(flag==0)
																			{
																			alert("check white king")
																			flag=1;
																			}
																			

																	}
																}
												
											}	}



function checking_check_mate(x,y)
{


var a=[];
var b=[];


	for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++)
			{
				if((chessboard[i][j].color!=chessboard[x][y].color) &&	(chessboard[i][j].color!="null"))
				{
					possible_move_x=[];
					possible_move_y=[];
					global_x=i;
					global_y=j;
					chessboard[i][j].calculate_possible_dulicate();

					console.log("---->>>>>>>>"+chessboard[i][j].name)
					a=a.concat(possible_move_x.slice())
					b=b.concat(possible_move_y.slice())



				}	
			}	
	}


		if (a.length<=0) 
		{
			alert("check mate")
		}


					console.log(a)
					console.log(b)


}









coin.prototype.calculate_possible_dulicate=function()
{

									switch(this.name)
									{

										case "pawn":
											 	calculate_pawn(global_x,global_y);
											 	break;

										case "rook":
											 	calculate_rook(global_x,global_y);
											 	break;


										case "knight":
											 	calculate_knight(global_x,global_y);
											 	break;


										case "bishop":
											 	calculate_bishop(global_x,global_y);
											 	break;

										case "queen":
											 	calculate_queen(global_x,global_y);
											 	break;

										case "king":
												calculate_king(global_x,global_y);
											 	break;

										default:
												alert('default')
												break;


									}





								var t_x=[];
								var t_y=[];

								var temp_color=chessboard[global_x][global_y].color;
								var temp_code=chessboard[global_x][global_y].code;
								var temp_name=chessboard[global_x][global_y].name;
									



								chessboard[global_x][global_y].color="null";
								chessboard[global_x][global_y].code="";
								chessboard[global_x][global_y].name="null";


								var temp_white_king_x =	white_king_x;
								var temp_white_king_y =	white_king_y;
								var temp_black_king_x =	black_king_x;
								var temp_black_king_y =	black_king_y;



									for (var i = 0; i < possible_move_x.length; i++) {



											var dummy_color=chessboard[possible_move_x[i]][possible_move_y[i]].color;
											var dummy_code=chessboard[possible_move_x[i]][possible_move_y[i]].code;
											var dummy_name=chessboard[possible_move_x[i]][possible_move_y[i]].name;



											chessboard[possible_move_x[i]][possible_move_y[i]].color=temp_color;
											chessboard[possible_move_x[i]][possible_move_y[i]].code=temp_code;
											chessboard[possible_move_x[i]][possible_move_y[i]].name=temp_name;




												 			if((temp_name=="king") && (temp_color=="white"))
									 						{
									 							white_king_x=parseInt(possible_move_x[i]);
									 							white_king_y=parseInt(possible_move_y[i]);
									 						}

									 						if((temp_name=="king") && (temp_color=="black"))
									 						{
									 							black_king_x=parseInt(possible_move_x[i]);
									 							black_king_y=parseInt(possible_move_y[i]);
									 						}






												find_enemy_team_color(temp_color);

												





															if(temp_color=="white")
															{


																				for (var j = 0; j < all_x.length; j++)
																				{

																					if((all_x[j]==white_king_x) &&	(all_y[j]==white_king_y))
																					{

																							// alert("danger white")
																							t_x.push(possible_move_x[i]);
																							t_y.push(possible_move_y[i]);

																					}
																				}
															



															}
															else
															{
																				for (var j = 0; j < all_x.length; j++)
																				{

																					if((all_x[j]==black_king_x) &&	(all_y[j]==black_king_y))
																					{

																							// alert("danger black")
																							t_x.push(possible_move_x[i]);
																							t_y.push(possible_move_y[i]);

																					}
																				}
																
															}


											chessboard[possible_move_x[i]][possible_move_y[i]].color=dummy_color;
											chessboard[possible_move_x[i]][possible_move_y[i]].code=dummy_code;
											chessboard[possible_move_x[i]][possible_move_y[i]].name=dummy_name;



											white_king_x=temp_white_king_x;
											white_king_y=temp_white_king_y;	
											black_king_x=temp_black_king_x;
											black_king_y=temp_black_king_y;



												}


								// alert("ello")
								var z_x=[]
								var z_y=[]
								var len=possible_move_x.length;
								var flag=0;
								temp=0;


									for (var k = 0; k < len; k++) {
										
										flag=0;

										for (var m = 0; m < t_x.length; m++) 
										{
											if(	( t_x[m] == possible_move_x[k] )	&&	( t_y[m] == possible_move_y[k] ) )
											{

												flag=1;
											}
										}

										if(flag==0)
										{
											z_x.push(possible_move_x[k])
											z_y.push(possible_move_y[k])

										}
									}


								possible_move_x=z_x.slice()
								possible_move_y=z_y.slice()






									// console.log("====>")
									// 				console.log("----"+all_x)
									// 				console.log("-----"+all_y)
									// 				console.log("p_m_w"+possible_move_x)
									// 				console.log("p_m_b"+possible_move_y)
									// 				console.log("whitekin===>"+white_king_x+"==="+white_king_y)

									// 				console.log("black in===>"+black_king_x+"==="+black_king_y)

								chessboard[global_x][global_y].color=temp_color;
								chessboard[global_x][global_y].code=temp_code;
								chessboard[global_x][global_y].name=temp_name;

}







