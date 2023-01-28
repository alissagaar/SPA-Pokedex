export default function validate(input) {
    const errors = {}

    //Name input
    if(!input.name) errors.name = 'Pokemon name is required';
    if(input.name.length < 2) errors.name = 'Insufficient characters';
    else if(!/^[A-Za-z0-9 ]+$/.test(input.name)) errors.name = 'No special characters';
    //Image input
    if(!input.image) errors.image = 'Pokemon image is required';
    //Types input
    if(!input.types.length) errors.types = 'Pokemon must have at least one type';
    if(input.types.length > 2) errors.types = `Pokemon mustn't have more than two types`;
    
    return errors
}

