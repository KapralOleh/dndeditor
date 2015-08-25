			$(function () {
				$('.grid-stack').gridstack({
					width: 12,
				});

				var grid=$('.grid-stack').data('gridstack'),
					width=$('#image-width'),
					height=$('#image-height'),
					effect=$('#image-effect'),
					top=$('#image-top'),
					left=$('#image-left'),
					replace_button=$('#replace-image'),
					replace_effect=$('#image-effect-replace'),
					replace_effect_out=$('#image-effect-replace-out');

				var set_replace_image=function(){
					if($('.clicked').length){
						replace_button.removeClass('pure-button-disabled');
						replace_button.addClass('button-success')
					}else{
						replace_button.removeClass('button-success');
						replace_button.addClass('pure-button-disabled')
					}
				};

				$(document).on('click', '.grid-stack-item', function(e){
					var self=$(this),
						is_clicked=self.is('.clicked');

					if(!is_clicked){
						$('.grid-stack-item').removeClass('clicked');
					}

					$(this).toggleClass('clicked');
					
					set_replace_image();
				});

				replace_button.click(function(e){
					e.preventDefault();
					
					var out_effect=replace_effect_out.val()
						in_effect=replace_effect.val(),
						clicked=$('.clicked');

					clicked.addClass(out_effect+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						clicked.html('<div class="grid-stack-item-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis enim eligendi laudantium magni dolorem repellendus, est hic modi, ipsa accusantium a quaerat sapiente! Quis impedit iure delectus, dolorem quod repudiandae!</div>');
						clicked.removeClass(out_effect+' animated').hide();

						clicked.addClass(in_effect+' animated').show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							clicked.removeClass(in_effect+' animated');
						});

						set_replace_image();
					});
				});

				$('#add-image').click(function(e){
					e.preventDefault();

					var el=$('<div/>'),
						widget,
						top_value=parseInt(top.val())>0?top.val():0,
						left_value=parseInt(left.val())>0?left.val():0;

					el.addClass('grid-stack-item');
					el.html('<div class="grid-stack-item-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia provident cumque eveniet enim beatae ipsam ducimus, autem facilis a repellendus, explicabo sapiente nisi earum et magni architecto! Voluptas, facilis inventore!</div>');

					widget=grid.add_widget(el, top_value, left_value, parseInt(width.val()), parseInt(height.val()), (!top_value && !left_value));

					widget.addClass(effect.val()+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass(effect.val()+' animated');
					});
				});
			});