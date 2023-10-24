// JavaScript Document
$( document ).ready(function() {

	// Jquery ui
  allTooltipMain();

});

  function allTooltipMain() {
    
    // tooltip
    $(".cs-tooltip").tooltip();
    
  $( ".cs-tooltip-left" ).tooltip({
      position: {
        my: "right center",
        at: "left-10 center",
        using: function( position, feedback ) {
          $( this ).css( position );
      $( this ).addClass( "cs-tooltip-left-block" );
          
        }
      }
    });
  
  $( ".cs-tooltip-right" ).tooltip({
      position: {
        my: "left center",
        at: "right+10 center",
        using: function( position, feedback ) {
          $( this ).css( position );
      $( this ).addClass( "cs-tooltip-right-block" );
          
        }
      }
    });
  
  $( ".cs-tooltip-top" ).tooltip({
      position: {
        my: "center bottom",
        at: "center top-10",
        using: function( position, feedback ) {
          $( this ).css( position );
      $( this ).addClass( "cs-tooltip-top-block" );
          
        }
      }
    });
  
  $( ".cs-tooltip-bottom" ).tooltip({
      position: {
        my: "center top",
        at: "center bottom+10",
        using: function( position, feedback ) {
          $( this ).css( position );
      $( this ).addClass( "cs-tooltip-bottom-block" );
          
        }
      }
    });
  
  
  
  $( ".cs-texttip-left" ).tooltip({
      position: {
        my: "right center",
        at: "left-10 center",
        using: function( position, feedback ) {
          $( this ).css( position );
      $( this ).addClass( "texttip-left-block" );
          
        }
      }
    });
  
  $( ".cs-texttip-right" ).tooltip({
      position: {
        my: "left center",
        at: "right+10 center",
        using: function( position, feedback ) {
          $( this ).css( position );
      $( this ).addClass( "texttip-right-block" );
          
        }
      }
    });
  
  $( ".cs-texttip-top" ).tooltip({
      position: {
        my: "center bottom",
        at: "center top-10",
        using: function( position, feedback ) {
          $( this ).css( position );
      $( this ).addClass( "texttip-top-block" );
          
        }
      }
    });
  
  $( ".cs-texttip-bottom" ).tooltip({
      position: {
        my: "center top",
        at: "center bottom+10",
        using: function( position, feedback ) {
          $( this ).css( position );
      $( this ).addClass( "texttip-bottom-block" );
          
        }
      }
    }); 
 }