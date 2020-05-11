
var Wapp = function() {

    var handleTheme = function() {}


    /**
     *  console.log(Wapp.form().get());
     *  console.log(Wapp.element().get('rel', 'usueml'));
     */

    return {
        init: function() {

        },
        element: function (){   
            return {
                /**
                 * PEGANDO ELEMENTO
                 * type [id, class, name, rel]
                 */
                get : function (type = null, element = null){
                    if(type === null || element === null){
                         return el;
                    }else{
                        var el = null;
                        switch (type) {
                          case 'class':
                             el = $("."+element).val();
                             break;
                          case 'name':
                            el = $("input[name='"+element+"']").val()
                            break;
                          case 'rel':
                            el = $("input[rel='"+element+"']").val()
                            break;
                          default:
                            el = $("#"+element).val();
                            break;
                        }
                        return el;
                    }         
                },
                set : function (type = null, element = null, value = null){
                    if(type === null || element === null){
                         return el;
                    }else{
                        var el = null;
                        switch (type) {
                          case 'class':
                             el = $("."+element).val(value);
                             break;
                          case 'name':
                            el = $("input[name='"+element+"']").val(value)
                            break;
                          case 'rel':
                            el = $("input[rel='"+element+"']").val(value)
                            break;
                          default:
                            el = $("#"+element).val(value);
                            break;
                        }
                        return el;
                    }         
                },


            }
        },
        form: function (){
            return {
                /**
                 * RETORNANDO CAMPOS DO FORM
                 */
                get : function(forms = null, filter = null)
                {
                    var form = (forms === null) ? $('form') : $(forms);
                    if(filter === null){
                        var inputs = form.find(':input').each(function() {
                            return $(this).val();
                        }).serializeArray();
                    }else{
                        var inputs = form.find(':input').filter(function() {
                            return $(this).val();
                        }).serializeArray();
                    }
                    var data = {};
                    $.each(inputs, function (index, obj){ 
                        if (data[obj.name]) {
                            if (!data[obj.name].push) {
                                data[obj.name] = [data[obj.name]];
                            }
                            data[obj.name].push(obj.value || '');
                        } else {
                            data[obj.name] = obj.value || '';
                        }
                    });
                    
                    return data;  
                },

                /**
                 * LIMPANDO FORMULARIO
                 */
                 reset : function(){
                    $('form').each(function(){
                        $(this).find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
                        $(this).find(':checkbox, :radio').prop('checked', false);
                        //FALTA SELECT2
                        //FALTA CHECKBOX (estilizado)
                    });
                 },
                
                /**
                 * DESABILITANDO FORMULARIO
                 */
                disabled : function(){
                    $("input, select, textarea").attr("disabled","disabled");
                    $("input[type='submit'], input[name='submit'], button[type='submit'], button[name='submit'], input[type='file']").hide();
                    $(".date-set, .date-reset, .spinner-up, .spinner-down").hide();
                }
            }
        },





    }

}();

